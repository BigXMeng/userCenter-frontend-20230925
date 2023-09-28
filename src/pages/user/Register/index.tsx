import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  // AlipayCircleOutlined,
  LockOutlined,
  // MobileOutlined,
  // TaobaoCircleOutlined,
  UserOutlined,
  // WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  // ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';

/**
 * RegisterMessage组件的定义
 * @param content 注册返回消息的内容
 * @constructor
 */
const LoginMessage: React.FC<{content: string;}> = ({ content }) => (
  // 嵌入一个提示组件 Alert 可以设置 style|message|type|showIcon等属性
  <Alert style={{marginBottom: 24,}} message={content} type="error" showIcon />
);
// 使用React创建了一个名为Register的函数组件 在函数组件中
// 使用useState钩子函数创建了一个名为userRegisterState的state变量，并初始化为一个空对象{}
const Register: React.FC = () => {
  const [userRegisterState, setUserRegisterState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  /**
   * 登录函数
   * @param values 登录时提交的表单数据（其实就是用户账号和密码）
   */
  const handleSubmit = async (values: API.RegisterParams) => {
    try {
      // 登录 rst是返回的结果
      const rst = await register({...values});
      if (rst) {
        message.success(rst.message);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }
      console.log(rst);

      // @ts-ignore 设置
      setUserRegisterState(rst);
    } catch (error) {
      const defaultRegisterFailureMessage = '登录失败，请重试！';
      message.error(defaultRegisterFailureMessage);
    }
  };
  // 对象解构 const{属性1,属性2}=对象; 这样解构以后 后面就可以直接使用属性1和属性2
  const { status, type: loginType } = userRegisterState;
  // 🔶 return语句用于在函数组件或类组件中返回JSX元素，这些JSX元素描述了组件在屏幕上应该显示的内容和结构
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="https://bigxmeng-bucket-10000.oss-cn-qingdao.aliyuncs.com/bigbigmeng.png" />}
          title="用户中心"
          subTitle={'实现企业必备用户中心后台管理方法'}
          initialValues={{ autoLogin: true, }}
          /*
            ⚡表单提交入口
            onFinish是一个回调函数，当表单提交完成时被调用
            该回调函数使用了异步函数语法，接受一个名为values的参数，类型为API.RegisterParams
            回调函数内部使用了await关键字来等待handleSubmit函数的执行结果
            handleSubmit函数接受values作为参数，参数类型断言为API.RegisterParams
            这意味着values将被转换为API.RegisterParams类型，并传递给handleSubmit函数
            在等待handleSubmit函数执行结束后，onFinish回调函数也会执行结束
           */
          onFinish={async (values: API.RegisterParams) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'使用账户密码登录'} />
            {/*<Tabs.TabPane key="mobile" tab={'手机号登录'} />*/}
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name='userAccount'
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPwd"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          {/*************** 自动登录 忘记密码组件 ************/}
          <div style={{ marginBottom: 24, }} >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a style={{ float: 'right', }} >
              {/*忘记密码请咨询管理员*/}
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;


/******************************* 手机号登录 *******************************/
/*{status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
{type === 'mobile' && (
  <>
    <ProFormText
      fieldProps={{
        size: 'large',
        prefix: <MobileOutlined className={styles.prefixIcon} />,
      }}
      name="mobile"
      placeholder={'请输入手机号！'}
      rules={[
        {
          required: true,
          message: '手机号是必填项！',
        },
        {
          pattern: /^1\d{10}$/,
          message: '不合法的手机号！',
        },
      ]}
    />
    <ProFormCaptcha
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined className={styles.prefixIcon} />,
      }}
      captchaProps={{
        size: 'large',
      }}
      placeholder={'请输入验证码！'}
      captchaTextRender={(timing, count) => {
        if (timing) {
          return `${count} ${'秒后重新获取'}`;
        }
        return '获取验证码';
      }}
      name="captcha"
      rules={[
        {
          required: true,
          message: '验证码是必填项！',
        },
      ]}
      onGetCaptcha={async (phone) => {
        const result = await getFakeCaptcha({
          phone,
        });
        // @ts-ignore
        if (result === false) {
          return;
        }
        message.success('获取验证码成功！验证码为：1234');
      }}
    />
  </>
)}*/

/********************* LoginForm的 actions属性 -> 一些icon链接 **********************/
/*
  <LoginForm
  logo={<img alt="logo" src="https://bigxmeng-bucket-10000.oss-cn-qingdao.aliyuncs.com/bigbigmeng.png" />}
  title="用户中心"
  subTitle={'实现企业必备用户中心后台管理方法'}
  initialValues={{ autoLogin: true, }}
  actions={[
    '其他登录方式 :',
    <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
    <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
    <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
  ]}
  >
 */
