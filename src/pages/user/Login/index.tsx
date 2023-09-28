import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
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
 * LoginMessage组件的定义 HTML也可以作为一个const变量进行声明
 * @param content 登录返回消息的内容
 * @constructor
 */
const LoginMessage: React.FC<{content: string;}> = ({ content }) => (
  // 嵌入一个提示组件 Alert 可以设置 style|message|type|showIcon等属性
  <Alert style={{marginBottom: 24,}} message={content} type="error" showIcon />
);

/**
 * 这是一个React函数组件 命名为Login 它使用了React的Hooks功能 具体使用了1️useState和2️useModel
 */
const Login: React.FC = () => {
  // 1️⃣useState用来在函数组件中添加状态管理
  // 在这里 函数组件定义了两个状态变量：userLoginState和type
  // userLoginState的初始值是一个空对象{} 类型为API.🎯LoginResult TODO -> 把它修改为自己定义的 ResponseEntity
  // type的初始值是字符串'account' TODO -> 含义是登录方式（这里是账户密登录 | 还有一种是手机号登录）
  const [userLoginState, setUserLoginState] = useState<API.ResponseEntity>({});
  /*
    这段代码使用了React的useState钩子，创建了一个名为type的状态变量，
    并初始化为字符串'account'。setType是用于更新type状态的函数。
    使用useState钩子是为了在函数组件中使用状态。
    它接受一个初始值作为参数，并返回一个包含两个元素的数组，第一个元素是当前状态的值，第二个元素是更新状态的函数。
    useState的初始值是字符串'account'，因此type的初始值为'account'。
    setType函数用于更新type状态的值，可以通过调用setType并传入新的值来修改type的值
   */
  const [loginWay, setType] = useState<string>('account');
  // 2️⃣useModel是用于 获取和设置全局状态 的自定义Hook
  // 通过调用useModel('@@initialState') 函数组件Login可以获取到全局状态的初始值和设置方法
  const { initialState, setInitialState } = useModel('@@initialState');
  // 3️⃣这里定义了一个异步函数fetchUserInfo 用来获取用户信息并更新全局状态
  const fetchUserInfo = async () => {
    // 4️⃣首先 它调用全局状态的fetchUserInfo方法获取用户信息
    //   如果成功返回了userInfo 则通过调用setInitialState方法更新全局状态 将currentUser属性设置为userInfo
    /*
      这行代码是使用可选链操作符（Optional Chaining）来调用initialState对象上的fetchUserInfo方法
      并使用await关键字等待该方法的返回结果 根据代码中的?.语法 如果initialState存在且fetchUserInfo方法存在
      那么就会调用fetchUserInfo方法 如果其中任何一个条件不满足 即initialState不存在或fetchUserInfo方法不存在
      那么整个表达式会返回undefined await关键字用于等待异步操作的结果 确保代码在获取到fetchUserInfo方法的返回值后再继续执行。
      根据代码的语境 fetchUserInfo方法可能是initialState对象上的一个异步函数
      它可能用于从服务器获取用户信息或执行其他需要异步操作的逻辑
      通过使用await关键字 可以确保在获取完用户信息后再执行后续的代码逻辑
    */
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  /**
   * handleSubmit 是一个异步函数 用于处理提交的表单值
   * 该函数接收一个名为values的参数 类型为API.LoginParams
   */
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 1️⃣ 首先 通过解构赋值将values对象的属性传递给login函数进行登录操作
      //     并将返回结果存储在 rst 变量中
      const rst = await login({...values});
      // 2️⃣ 对rst执行判空操作
      if (rst) {
        // 显示提示 -> 是否登陆成功
        message.success(rst.message);
        // 获取登录用户的信息
        await fetchUserInfo();
        /*
          下面代码段的作用是 如果存在浏览器的历史记录对象（history）
          则获取浏览器历史记录中的查询参数（query） 并从中提取重定向参数（redirect）
          然后使用history.push方法将页面重定向到重定向参数所指定的地址
          如果重定向参数不存在 则将页面重定向到根路径（'/'）
         */
        // （1）首先判断浏览器历史记录对象（history）是否存在 如果不存在 则直接返回 不执行后续代码
        if (!history) return;
        // （2）如果存在浏览器历史记录对象（history） 则通过history.location获取当前页面的URL信息
        const { query } = history.location;
        // （3）从URL中的查询参数（query）中提取重定向参数（redirect）
        const { redirect } = query as {
          redirect: string;
        };
        // （4）使用history.push方法将页面重定向到重定向参数所指定的地址
        //      如果重定向参数不存在 则将页面重定向到根路径（'/'）
        history.push(redirect || '/');
        return;
      }
      // 控制台打印rst
      console.log(rst);
      // 3️⃣接着 调用 setUserLoginState 将 rst 的值作为参数来设置用户的登录状态
      setUserLoginState(rst);
    } catch (error) {
      // 在 catch 块中 会定义一个名为 defaultLoginFailureMessage 的变量 用于存储默认的登录失败提示信息
      const defaultLoginFailureMessage = '登录失败 请重试！';
      // 随后 使用 message.error 方法将 defaultLoginFailureMessage 输出为错误信息 提示用户登录失败并请其重试
      message.error(defaultLoginFailureMessage);
    }
  };
  // 🔶 return语句用于在函数组件或类组件中返回JSX元素 这些JSX元素描述了组件在屏幕上应该显示的内容和结构
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
            onFinish是一个回调函数 当表单提交完成时被调用
            该回调函数使用了异步函数语法 接受一个名为values的参数 类型为API.LoginParams
            回调函数内部使用了await关键字来等待handleSubmit函数的执行结果
            handleSubmit函数接受values作为参数 参数类型断言为API.LoginParams
            这意味着values将被转换为API.LoginParams类型 并传递给handleSubmit函数
            在等待handleSubmit函数执行结束后 onFinish回调函数也会执行结束
           */
          onFinish={async (values: API.LoginParams) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {/*LoginForm当中的第一个组件 用于显示登录的方式 账户和密码登录 还是手机号登录*/}
          <Tabs activeKey={loginWay} onChange={setType}>
            <Tabs.TabPane key="account" tab={'使用账户密码登录'} />
            {/*<Tabs.TabPane key="mobile" tab={'手机号登录'} />*/}
          </Tabs>
          {/*LoginForm当中的一个组件 用于显示错误信息 在密码和账户键入框上面*/}
          {userLoginState.code !== 200 && (
            <LoginMessage content={userLoginState.message || '用户名或密码不正确'} />
          )}
          {/*LoginForm当中的下一个组件 用于显示登录表单*/}
          {loginWay === 'account' && (
            <>
              <ProFormText
                name='userAccount'
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'输入账户名: (管理员或者普通用户)'}
                rules={[
                  {
                    required: true,
                    message: '账户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPwd"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'输入密码: (********)'}
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
export default Login;


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
