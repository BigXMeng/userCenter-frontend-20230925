// @ts-ignore
/* eslint-disable */

/**
 * typings.d.ts 是TypeScript的声明文件
 * 用于为没有自己的TypeScript支持的外部JavaScript库或模块提供类型定义。
 *
 * 在TypeScript中，.d.ts 扩展名通常用于声明文件
 * 这些文件包含了环境声明（ambient declarations）
 * 允许TypeScript理解在外部JavaScript代码中定义的变量、函数或对象的类型
 *
 * 类似 typings.d.ts 这样的声明文件通常在使用JavaScript库时使用
 * 这些库可能没有用TypeScript编写 但仍需要在TypeScript项目中使用
 * 通过引入声明文件 开发人员可以提供静态类型信息 以确保更好的类型安全性
 * 并在与这些库一起开发时提供代码辅助，如智能感知
 *
 * 通常，typings.d.ts 文件是手动创建或从已经为常用库提供了类型声明的开源社区项目中获取的
 * 这些声明文件定义了库的API的类型和接口 以便TypeScript可以执行类型检查并在开发过程中提供有用的建议
 *
 * 要使用像 typings.d.ts 这样的声明文件 在TypeScript项目的配置中包含它
 * 或者在个别的TypeScript文件中使用类似 /// <reference path="path/to/typings.d.ts" />
 * 的三斜线指令引用它
 *
 * 总而言之，typings.d.ts 是将外部JavaScript库与TypeScript集成的关键部分
 * 它实现了更好的类型检查和出色的开发体验。
 */

/* 命名空间 -> API 所有文件中出现API的地方都是使用了这个命名空间 */
declare namespace API {

  // 只定义前端可以显示的数据项 比如userPwd就不需要定义了
  type CurrentUser = {
    userId?: number;
    userNickname?: string;
    userAccount?: string;
    userAvatar?: string;
    userGender?:number;
    userPhone?: string;
    userEmail?: string;
    userStatus?: number;
    userRole?: number;
    userCode?: string;
    userCreateTime?: Date;
  };

  // 这里的LoginResult其实就是下面定义的ResponseEntity
  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  // 20230926 登录参数封装到变量LoginParams
  type LoginParams = {
    userAccount?: string;   // 命名和后端保持一致
    userPwd?: string;       // 命名和后端保持一致
    // autoLogin?: boolean; // 去掉
    // type?: string;       // 去掉
  };

  // 20230927 注册参数封装到RegisterParams
  type RegisterParams = {
    userAccount?: string;   // 命名和后端保持一致
    userPwd?: string;       // 命名和后端保持一致
    userRePwd?: string;     // 命名和后端保持一致
  }

  // 20230926 添加一个和后端一致的消息返回实体 `ResponseEntity`
  type ResponseEntity = {
    code?: number;    // 返回状态码
    message?: string; // 返回简要消息
    map?: object;     // 携带的数据对象
  }

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  // export class RegisterParams {
  // }
  export class RegisterResult {
  }
}
