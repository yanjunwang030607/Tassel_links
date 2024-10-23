from flask import render_template, Blueprint, request, jsonify
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

main = Blueprint('main', __name__)

logging.basicConfig(level=logging.INFO)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/api/submit_answers', methods=['POST'])
def submit_answers():
    data = request.json
    send_email(data)
    return jsonify({"status": "success"}), 200

@main.route('/api/submit_dare', methods=['POST'])
def submit_dare():
    data = request.json
    send_dare_email(data)
    return jsonify({"status": "success"}), 200

@main.route('/api/submit_mystery_results', methods=['POST'])
def submit_mystery_results():
    data = request.json
    send_mystery_email(data)
    return jsonify({"status": "success"}), 200

def send_email(data):
    # 邮件服务器配置
    smtp_server = 'smtp.qq.com'  # 替换为您的 SMTP 服务器
    smtp_port = 587
    smtp_user = '3299371695@qq.com'  # 替换为您的邮箱
    smtp_password = 'xoxawdmnfpzvdbid'  # 使用授权码

    # 构建邮件内容
    subject = "子艺的回答"
    body = "\n".join([f"{q['question']} 答案：{q['answer']}" for q in data])
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = smtp_user  # 发送给自己
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # 发送邮件
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())  # 发送给自己
        server.quit()
        print("邮件发送成功")
    except Exception as e:
        print(f"邮件发送失败: {e}")

def send_dare_email(data):
    # 邮件服务器配置
    smtp_server = 'smtp.qq.com'
    smtp_port = 587
    smtp_user = '3299371695@qq.com'
    smtp_password = 'xoxawdmnfpzvdbid'  # 使用授权码

    # 构建邮件内容
    subject = "子艺的大冒险任务"
    body = f"大冒险任务：{data['dare']}"
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = smtp_user  # 发送给自己
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # 发送邮件
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())  # 发送给自己
        server.quit()
        print("邮件发送成功")
    except Exception as e:
        print(f"邮件发送失败: {e}")

def send_mystery_email(data):
    # 邮件服务器配置
    smtp_server = 'smtp.qq.com'
    smtp_port = 587
    smtp_user = '3299371695@qq.com'
    smtp_password = 'xoxawdmnfpzvdbid'  # 使用授权码

    # 构建邮件内容
    subject = "romantic_mystery测试结果"
    body = "\n".join([f"{q['question']} 错误尝试次数：{q['attempts']}" for q in data])
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = smtp_user  # 发送给自己
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # 发送邮件
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())  # 发送给自己
        server.quit()
        print("邮件发送成功")
    except Exception as e:
        print(f"邮件发送失败: {e}")
