/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      screens: {
        'login-form': '422px',
      },
      fontFamily: {
        pingfang: ['PingFangSC-Semibold', 'PingFang SC'],
      },
      boxShadow: {
        login: '0px 2px 13px 0px rgba(0, 0, 0, 0.21)',
        primary: 'var(--el-box-shadow)',
        light: 'var(--el-box-shadow-light)',
        lighter: 'var(--el-box-shadow-lighter)',
      },
      backgroundColor: {
        theme: '#44B044',
        page: 'var(--el-bg-color-page)',
        primary: 'var(--el-fill-color-lighter)',
        'login-btn': '#1949ad',
        'login-btn-hover': '#5A80D0',
        default: 'var(--el-bg-color)',
      },
      backgroundImage: {
        'login-footer':
          "url('@/assets/images/engineerLogin/engineer_login_footer.png')",
      },
      textColor: {
        theme: 'var(--el-color-primary)',
        primary: 'var(--el-text-color-primary)',
        regular: 'var(--el-text-color-regular)',
        secondary: 'var(--el-text-color-secondary)',
        placeholder: 'var(--el-text-color-placeholder)',
        disabled: 'var(--el-text-color-disabled)',
      },
      borderColor: {
        theme: 'var(--el-color-primary)',
        normal: 'var(--el-border-color)',
        light: 'var(--el-border-color-light)',
        lighter: 'var(--el-border-color-lighter)',
        extraLight: 'var(--el-border-color-extra-light)',
        'login-btn-hover': '#5A80D0',
      },
    },
  },
  plugins: [],
};
