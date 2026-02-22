<template>
  <div class="login-page">
    <div class="login-background"></div>
    <div class="login-container">
      <div class="login-header">
        <h1>资源分享平台</h1>
        <p>分享作业答案</p>
      </div>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="name" class="form-label">请输入您的名字</label>
          <div class="input-container">
            <input type="text" id="name" v-model="name" required class="form-input" placeholder="请输入您的名字" />
          </div>
        </div>
        <button type="submit" class="login-button">
          <span>登录</span>
        </button>
      </form>
      <div class="login-footer">
        <p>登录后即可访问所有科目资源</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('测试用户')

const login = () => {
  if (name.value.trim()) {
    localStorage.setItem('userName', name.value.trim())
    router.push('/chinese')
  }
}
</script>

<style scoped>
/* 全局样式重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: backgroundMove 10s ease-in-out infinite;
}

@keyframes backgroundMove {
  0% { transform: translate(0, 0); }
  33% { transform: translate(5%, 5%); }
  66% { transform: translate(-5%, 5%); }
  100% { transform: translate(0, 0); }
}

.login-container {
  max-width: 420px;
  width: 90%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 3rem 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-header h1 {
  color: #2c3e50;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.form-label {
  display: block;
  color: #34495e;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
}

.input-container {
  position: relative;
  transition: all 0.3s ease;
}

.form-input {
  width: 100%;
  padding: 1rem 1.2rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  background: #f8f9fa;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #3498db;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  transform: translateY(-2px);
}

.form-input::placeholder {
  color: #95a5a6;
  font-weight: 400;
}

.login-button {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}

.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
  background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
}

.login-button:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(52, 152, 219, 0.5);
}

.login-button span {
  position: relative;
  z-index: 2;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
  z-index: 1;
}

.login-button:hover::before {
  left: 100%;
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
}

.login-footer p {
  color: #95a5a6;
  font-size: 0.9rem;
  margin-bottom: 0;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .login-container {
    padding: 3.5rem 2.5rem;
  }

  .login-header h1 {
    font-size: 2.5rem;
  }

  .login-header p {
    font-size: 1.2rem;
  }

  .form-input {
    padding: 1.1rem 1.3rem;
    font-size: 1.1rem;
  }

  .login-button {
    padding: 1.1rem 2rem;
    font-size: 1.2rem;
  }
}

/* 移动端优化 */
@media (max-width: 480px) {
  .login-container {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }

  .login-header {
    margin-bottom: 2rem;
  }

  .login-header h1 {
    font-size: 1.8rem;
    margin-bottom: 0.6rem;
  }

  .login-header p {
    font-size: 1rem;
  }

  .login-form {
    gap: 1.2rem;
  }

  .form-input {
    padding: 0.9rem 1.1rem;
    font-size: 0.95rem;
  }

  .login-button {
    padding: 0.9rem 1.5rem;
    font-size: 1rem;
  }

  .login-footer {
    margin-top: 1.5rem;
  }

  .login-footer p {
    font-size: 0.85rem;
  }
}
</style>