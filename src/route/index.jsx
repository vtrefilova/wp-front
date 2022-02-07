// dashbaord
import Default from '../components/dashboard/default'
import BaseCategory from '../components/Base Category/BaseCategory'
import PriceList from '../components/Price List/PriceList'
import FilePanel from '../components/File Panel/FilePanel'
import RoleManager from '../components/Role Manager/RoleManager'
import RoleEditor from '../components/Role Editor/RoleEditor'
import CardBlank from '../components/Card Blank/CardBlank'
import Notification from '../components/Notification/Notification'
import User from '../components/User/User';
import UserPanel from '../components/User Panel/UserPanel'
import ErrorLogs from '../components/Error Logs/ErrorLogs'
import AdminLogs from '../components/Admin Logs/AdminLogs'
import HelpLeads from '../components/Help Leads/HelpLeads'


export const routes = [
        { path:"/dashboard/main/", Component:Default},
        { path:"/dashboard/base-category/", Component:BaseCategory},
        { path:"/dashboard/users/", Component:User},
        { path:"/dashboard/user/:id", Component:UserPanel},
        { path:"/dashboard/pricing/", Component:PriceList},
        { path:"/dashboard/file-panel/", Component:FilePanel},
        { path:"/dashboard/role-panel/", Component:RoleManager},
        { path:"/dashboard/role-editor/:id", Component:RoleEditor},
        { path:"/dashboard/loyalty-blank/", Component:CardBlank},
        { path:"/dashboard/notifications/", Component:Notification},
        { path:"/dashboard/error-logs/", Component:ErrorLogs},
        { path:"/dashboard/admin-logs/", Component:AdminLogs},
        { path:"/dashboard/help-leads/", Component:HelpLeads},
        { path:"/dashboard/advertising/", Component:HelpLeads},
]