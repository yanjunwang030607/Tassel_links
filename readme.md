    fnm env --use-on-cd | Out-String | Invoke-Expression

    fnm use --install-if-missing 20

    node -v

    npm -v

    npm install -g vercel


git add *    （注：别忘记后面的.，此操作是把Test文件夹下面的文件都添加进来）

git commit  -m  "提交信息"  （注：“提交信息”里面换成你需要，如“first commit”）

git push -u origin master分支   （注：此操作目的是把本地仓库push到github上面，此步骤需要你输入帐号和密码）

