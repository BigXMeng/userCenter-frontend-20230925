// import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = '@BigBigMeng技术出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '我亦无他',
          title: '我亦无他',
          href: '#',
          blankTarget: true,
        },
        // {
        //   key: 'github',
        //   title: <GithubOutlined/>,
        //   href: 'https://github.com/ant-design/ant-design-pro',
        //   blankTarget: true,
        // },
        {
          key: '唯手熟尔',
          title: '唯手熟尔',
          href: '#',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
