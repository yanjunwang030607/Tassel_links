document.addEventListener('DOMContentLoaded', () => {
    const audioElement = document.getElementById('backgroundMusic');
    const submitButton = document.querySelector('button[onclick="displayText()"]');

    // 标记音乐是否已经开始播放
    let musicStarted = false;

    // 页面加载时播放音乐
    if (!musicStarted) {
        playMusic(audioElement);
        musicStarted = true;
    }

    // 当用户点击提交按钮时播放音乐
    document.body.addEventListener('click', () => {
        if (!musicStarted) {
            playMusic(audioElement);
            musicStarted = true;
        }
    });

    // 确保在任何其他交互中音乐不停止
    document.body.addEventListener('click', () => {
        if (musicStarted && audioElement.paused) {
            audioElement.play().catch(error => {
                console.error('播放音乐时出错:', error);
            });
        }
    });
});

function playMusic(audioElement) {
    if (audioElement) {
        audioElement.play().then(() => {
            console.log('音乐播放成功');
        }).catch(error => {
            console.error('播放音乐时出错:', error);
        });
    } else {
        console.error('未找到音频元素');
    }
}
function displayText() {
    const input = document.getElementById('userInput').value;
    const outputElement = document.getElementById('output');
    const quizElement = document.getElementById('quiz');
    const truthOrDareButton = document.getElementById('truthOrDare');
    const anniversaryMessageElement = document.getElementById('anniversaryMessage');
    const meteorBottleButton = document.getElementById('meteorBottle');

    if (input === "范子艺") {
        outputElement.innerText = "欢迎您";
        quizElement.style.display = 'block';
        truthOrDareButton.style.display = 'block';
        anniversaryMessageElement.innerText = displayAnniversaryMessage();
        meteorBottleButton.style.display = 'block'; // 显示流星瓶按钮
    } else {
        outputElement.innerText = "你不配访问此处，给我滚出去！！！";
        quizElement.style.display = 'none';
        truthOrDareButton.style.display = 'none';
        anniversaryMessageElement.innerText = '';
        meteorBottleButton.style.display = 'none'; // 隐藏流星瓶按钮
    }
}

let timer;
function startQuiz() {
    document.getElementById('anniversaryMessage').innerText = ''; // 隐藏纪念日信息
    clearPreviousContent(); // 清除之前的内容
    currentMysteryQuestionIndex = 0; // 重置问题索引
    displayMysteryQuestion(); // 显示第一个问题
}

function checkAnswer() {
    const answerInput = document.getElementById('answerInput');
    const quizOutputElement = document.getElementById('quizOutput');
    const bodyElement = document.body;

    clearTimeout(timer); // 停止计时器

    if (answerInput.value === "0507") {
        // 隐藏页面上的所有其他元素
        bodyElement.innerHTML = ''; // 清空页面内容

        // 创建提示信息
        const successMessage = document.createElement('p');
        successMessage.innerText = "哇塞塞，子艺仙女，您确实是王彦军的大宝贝，欢迎您！！！";
        successMessage.style.fontSize = '2em'; // 设置提示信息字体大小
        successMessage.style.color = 'black'; // 设置提示信息颜色

        // 创建图片元素
        const img = document.createElement('img');
        img.src = 'DDDDDDD/static/images/love.jpg'; // 替换为你的图片路径
        img.alt = '成功图片';
        img.style.width = '100vw'; // 设置图片宽度为视口宽度
        img.style.height = '100vh'; // 设置图片高为视口高度
        img.style.objectFit = 'cover'; // 确保图片覆盖整个视口
        img.style.position = 'absolute'; // 绝对定位
        img.style.top = '0';
        img.style.left = '0';

        // 将提示信息和图片添加到页面
        bodyElement.appendChild(successMessage);
        bodyElement.appendChild(img);

    } else {
        quizOutputElement.innerText = "你谁啊你，跟子艺仙女重名了吧，再试一次，说不对就滚蛋，滚蛋！！！";
    }

    answerInput.value = ''; // 清空输入框
}

function showTruthOrDareOptions() {
    document.getElementById('anniversaryMessage').innerText = ''; // 隐藏纪念日信息
    const truthOrDareElement = document.getElementById('truthOrDareOptions');
    truthOrDareElement.style.display = 'block'; // 显示真心话大冒险选项
    const truthOrDareButton = document.getElementById('truthOrDare');
    truthOrDareButton.style.display = 'none'; // 隐藏真心话大冒险按钮
}

function chooseTruth() {
    clearPreviousContent(); // 清除之前的内
    currentQuestionIndex = 0; // 重置问题索引
    displayQuestion(); // 显示第一个问题
}

function chooseDare() {
    clearPreviousContent(); // 清除之前的内容
    displayDare(); // 显示随机大冒险内容
}

function clearPreviousContent() {
    const bodyElement = document.body;
    bodyElement.innerHTML = ''; // 清空页面内
}

function displayQuestion() {
    const questionElement = document.createElement('div');
    questionElement.id = 'questionContainer';
    questionElement.innerHTML = `
        <p style="color: black; font-size: 2em; font-weight: bold;">${questions[currentQuestionIndex].question}</p> <!-- 设置字体颜色为黑色，字体大小为1.5em，加粗 -->
        <input type="text" id="answerInput" placeholder="请输入答案">
        <button onclick="submitAnswer()">确定</button>
        <p id="quizOutput" class="quiz-output"></p>
    `;
    document.body.appendChild(questionElement);
}

function submitAnswer() {
    const answerInput = document.getElementById('answerInput');
    questions[currentQuestionIndex].answer = answerInput.value; // 记录用户答案
    answerInput.value = ''; // 清空输入框

    currentQuestionIndex++; // 移动到下一个问题

    // 清除之前的问题和输入框
    const questionContainer = document.getElementById('questionContainer');
    if (questionContainer) {
        questionContainer.remove(); // 移除当前问题
    }

    if (currentQuestionIndex < questions.length) {
        displayQuestion(); // 显示下一个问题
    } else {
        displayResults(); // 显示结果
    }
}

function displayResults() {
    const resultElement = document.createElement('div');
    resultElement.innerHTML = '<h2>感谢您的真心话，请返回主页或进行您的其他意向选择</h2>';
    // questions.forEach((q) => {
    //     resultElement.innerHTML += `<p>${q.question} 答案：${q.answer || '未回答'}</p>`;
    // });

    // 添加 Back 按钮
    const backButton = document.createElement('button');
    backButton.innerText = 'Back';
    backButton.onclick = () => {
        location.reload(); // 重新加载页面，返回主页面
    };

    resultElement.appendChild(backButton);
    document.body.appendChild(resultElement);

    // 发送数据到后端
    fetch('/api/submit_answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questions)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

function displayDare() {
    const randomIndex = Math.floor(Math.random() * dares.length);
    const selectedDare = dares[randomIndex];
    const dareElement = document.createElement('div');
    dareElement.innerHTML = `<h2 style="color: black; font-size: 1.5em;">你的大冒险任务：</h2><p style="color: blue; font-size: 3em;font-weight: bold;">${selectedDare}</p>`;

    // 添加 Back 按钮
    const backButton = document.createElement('button');
    backButton.innerText = 'Back';
    backButton.onclick = () => {
        location.reload(); // 重新加载页面，返回主页面
    };

    dareElement.appendChild(backButton);
    document.body.appendChild(dareElement);

    // 发送大冒险任务到后端
    fetch('/api/submit_dare', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dare: selectedDare })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

let currentQuestionIndex = 0; // 当前问题索引
const questions = [
    { question: "真心话1：你最难忘的他的一旅行是哪次？说地点就行。", answer: "" },
    { question: "真心话2：你最被他拿捏到“春心萌动”的一个动作是什么？", answer: "" },
    { question: "真心话3：他最让你着迷的一点是什么？", answer: "" }
];

const dares = [
    "立刻马上就联系你爱的他大声告诉他：你是否会爱他一生一世！",
    "立刻对你爱的他说一句你最想对他说的歌词来感动他，跟他说你现在特别想吻他。。",
    "立刻好好一下你最爱的那个他，并且叫他10次老公小宝贝吧",
    "立刻马上给你最爱的他发一张自拍。",
    "立刻给你爱的他唱一两句你爱的歌！"
];

let currentMysteryQuestionIndex = 0;
const romanticMysteryQuestions = [
    { question: "问题1：王彦军生日是农历几月几日？示例回答：5月20日", answer: "5月7日", attempts: 0 },
    { question: "问题2：王彦军最不喜欢吃的蔬菜是什么？示例回答：红枣", answer: "土豆", attempts: 0 },
    { question: "问题3：王彦军觉得最重要的调料是什么？示例回答：蒜泥", answer: "醋", attempts: 0 }
];

function displayMysteryQuestion() {
    const questionElement = document.createElement('div');
    questionElement.id = 'mysteryQuestionContainer';
    questionElement.innerHTML = `
        <p style="color: black; font-size: 1.5em;font-weight: bold;">${romanticMysteryQuestions[currentMysteryQuestionIndex].question}</p> <!-- 设置字体颜色为黑色，字体大小为1.5em -->
        <input type="text" id="mysteryAnswerInput" placeholder="请输入答案">
        <button onclick="submitMysteryAnswer()">确定</button>
        <p id="mysteryQuizOutput" class="quiz-output"></p>
    `;
    document.body.appendChild(questionElement);
}

function submitMysteryAnswer() {
    const answerInput = document.getElementById('mysteryAnswerInput');
    const quizOutputElement = document.getElementById('mysteryQuizOutput');
    const currentQuestion = romanticMysteryQuestions[currentMysteryQuestionIndex];

    if (answerInput.value === currentQuestion.answer) {
        quizOutputElement.innerText = "恭喜您，全都回答正确！子艺仙女！您总算没有辜负他的期望\n感谢您的参与，请返回主页或进行您的其他意向选择";
        currentMysteryQuestionIndex++;
        if (currentMysteryQuestionIndex < romanticMysteryQuestions.length) {
            document.getElementById('mysteryQuestionContainer').remove();
            displayMysteryQuestion();
        } else {
            displayMysteryResults();
        }
    } else {
        quizOutputElement.innerText = "回答错误，请重试。";
        currentQuestion.attempts++;
    }

    answerInput.value = ''; // 清空输入框
}

function displayMysteryResults() {
    const resultElement = document.createElement('div');
    resultElement.innerHTML = '<h2>romantic_mystery测试结果：</h2>';
    romanticMysteryQuestions.forEach((q) => {
        resultElement.innerHTML += `<p>${q.question} 错误尝试次数：${q.attempts}</p>`;
    });

    // 添加 Back 按钮
    const backButton = document.createElement('button');
    backButton.innerText = 'Back';
    backButton.onclick = () => {
        location.reload(); // 重新加载页面，返回主页面
    };

    resultElement.appendChild(backButton);
    document.body.appendChild(resultElement);

    // 发送数据到后端
    fetch('/api/submit_mystery_results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(romanticMysteryQuestions)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

function calculateDaysSince(dateString) {
    const startDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
}

function displayAnniversaryMessage() {
    const daysSince = calculateDaysSince('2023-12-20');
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
    return `今天是${formattedDate}，距离我们2023年12月20日在一起，我们已经走过${daysSince}个幸福的昼夜。`;
}

function showMeteorBottleInput() {
    // 清除页面上无关的内容
    document.body.innerHTML = ''; // 清空页面内容

    // 创建流星瓶输入框和发射按钮
    const meteorBottleContainer = document.createElement('div');
    meteorBottleContainer.id = 'meteorBottleContainer';
    meteorBottleContainer.innerHTML = `
        <textarea id="meteorBottleInput" placeholder="请写下你想包装的流星瓶"></textarea>
        <button onclick="sendMeteorBottle()">发射</button>
        <p id="meteorBottleOutput" class="quiz-output"></p>
        <button onclick="showSentBottles()">已发射流星瓶</button>
        <button onclick="backToHome()">Back</button>
    `;

    // 将流星瓶容器添加到页面
    document.body.appendChild(meteorBottleContainer);
}

function sendMeteorBottle() {
    const input = document.getElementById('meteorBottleInput').value;
    const outputElement = document.getElementById('meteorBottleOutput');

    fetch('/api/send_meteor_bottle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: input })
    })
    .then(response => response.json())
    .then(data => {
        outputElement.innerText = "已发射";
        console.log('Success:', data);
    })
    .catch((error) => {
        outputElement.innerText = "发送失败";
        console.error('Error:', error);
    });

    document.getElementById('meteorBottleInput').value = ''; // 清空输入框
}

function showSentBottles() {
    // 清除页面内容并显示已发射流星瓶
    document.body.innerHTML = '<button onclick="showMeteorBottleInput()">Back</button><div id="sentBottlesContainer"></div>';
    
    fetch('/api/get_sent_bottles')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('sentBottlesContainer');
        data.forEach(bottle => {
            const bottleElement = document.createElement('div');
            bottleElement.innerHTML = `
                <p class="sent-bottle-content">${bottle.date}: ${bottle.content}</p>
                <button class="delete-button" onclick="deleteBottle('${bottle.id}')">删除</button>
            `;
            container.appendChild(bottleElement);
        });
    })
    .catch(error => console.error('Error:', error));
}

function deleteBottle(id) {
    fetch(`/api/delete_bottle/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
        console.log('Deleted:', data);
        showSentBottles(); // 刷新列表
    })
    .catch(error => console.error('Error:', error));
}

function backToHome() {
    location.reload(); // 重新加载页面，返回主页面
}

