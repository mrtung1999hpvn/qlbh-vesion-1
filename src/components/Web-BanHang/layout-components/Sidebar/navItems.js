import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import GradeTwoTone from '@material-ui/icons/GradeTwoTone';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

var iconsMap = {
  BarChartIcon: BarChartIcon,
  CalendarTodayIcon: CalendarTodayIcon,
  ChatIcon: ChatIcon,
  CodeIcon: CodeIcon,
  DashboardIcon: DashboardIcon,
  ErrorIcon: ErrorIcon,
  FolderIcon: FolderIcon,
  DashboardTwoToneIcon: DashboardTwoToneIcon,
  GradeTwoTone: GradeTwoTone,
  ListAltIcon: ListAltIcon,
  LockOpenIcon: LockOpenIcon,
  MailIcon: MailIcon,
  PresentToAllIcon: PresentToAllIcon,
  PeopleIcon: PeopleIcon,
  PersonIcon: PersonIcon,
  ReceiptIcon: ReceiptIcon,
  SettingsIcon: SettingsIcon,
  ViewModuleIcon: ViewModuleIcon
};

export default [
  {
    label: '',
    content: JSON.parse(
      `[
    {
    "label": "Danh mục",
    "icon": "DashboardTwoToneIcon",
    "content": [
      {
        "label": "Phân theo nhóm hàng",
        "description": "This is a dashboard page example built using this template.",
        "to": "/NhomHang"
      },
      {
        "label": "Phân theo loại hàng",
        "description": "This is a dashboard page example built using this template.",
        "to": "/NhomLoaiHang"
      },
      {
        "label": "Các mặt hàng hiện tại",
        "description": "This is a dashboard page example built using this template.",
        "to": "/MatHang"
      }
    ]
  },
  {
    "label": "Giỏ hàng",
    "icon": "DashboardTwoToneIcon",
    "content": [
      {
        "label": "Giỏ hàng",
        "description": "This is a dashboard page example built using this template.",
        "to": "/NhomHang"
      },
      {
        "label": "Đặt hàng",
        "description": "This is a dashboard page example built using this template.",
        "to": "/NhomLoaiHang"
      },
      {
        "label": "Đánh giá",
        "description": "This is a dashboard page example built using this template.",
        "to": "/MatHang"
      }
    ]
  },
  {
    "label": "Thông tin người dùng",
    "icon": "DashboardTwoToneIcon",
    "content": [
      {
        "label": "Chi tiết người dùng",
        "description": "This is a dashboard page example built using this template.",
        "to": "/NhomHang"
      },
      {
        "label": "Đặt hàng",
        "description": "This is a dashboard page example built using this template.",
        "to": "/NhomLoaiHang"
      }
    ]
  }
]`,
      (key, value) => {
        if (key === 'icon') {
          return iconsMap[value];
        } else {
          return value;
        }
      }
    )
  }
];
