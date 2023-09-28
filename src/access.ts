/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    // 数据库字段的 userRole === 1 表示管理员权限
    canAdmin: currentUser && currentUser.userRole === 1,
  };
}
