/* eslint-disable react-refresh/only-export-components */

import {createBrowserRouter} from 'react-router-dom';
import {lazy} from 'react';
import {PageNotFound} from './system-component/PageNotFound.jsx';
import ProtectedLayout from './layouts/ProtectedLayout.jsx';
import {MainLayout} from './layouts/MainLayout.jsx';
import AuthorizedView from './system-component/AuthorizedView.jsx';
import {callBackUrl} from '../../pages/CallBackHandler.jsx';
import RoleLayout from '../../pages/admin/layout-admin/role-manage/RoleLayout.jsx';
import SettingLayout from '../../pages/admin/layout-admin/setting-manage/SettingLayout.jsx';
import CustomerLayout from '../../pages/admin/layout-admin/customer-manage/CustomerLayout.jsx';
import CustomerTransactionLayout
  from '../../pages/admin/layout-admin/transaction-manage/manage/user-transaction/CustomerTransactionLayout.jsx';
import ApplicationManager from '../../pages/partner/ApplicationManager.jsx';
import AppPartnerLayout from '../../pages/app/AppPartnerLayout.jsx';

const ApiKeyPage = lazy(() => import('../../pages/partner/ApiKeyPage.jsx'));
const PartnerLayout = lazy(() => import('../../pages/partner/PartnerLayout.jsx'));

// Lazy loading components
const TopUp = lazy(() => import('../../components/topup/TopUp.jsx')),
    MyWallet = lazy(() => import('../../components/account/WalletSection.jsx')),
    ServicePayment = lazy(() => import('../../components/payment/ServicePayment.jsx')),
    AnalysisPage = lazy(() => import('../../components/bdsd/bdsd.jsx')),
    QRPayment = lazy(() => import('../../components/payment/QRPayment.jsx')),
    AdminDashboard = lazy(() => import('../../pages/admin/AdminDashboard.jsx')),
    ResetPasswordPage = lazy(() => import('../../pages/ResetPasswordPage.jsx')),
    CallBackHandler = lazy(() => import('../../pages/CallBackHandler.jsx')),
    TransactionHistoryPage = lazy(() => import('../../pages/cores/TransactionHistoryPage.jsx')),
    AtmPage = lazy(() => import('../../pages/cores/AtmPage.jsx')),
    IntroPage = lazy(() => import('../../pages/cores/IntroPage.jsx')),
    SignInPage = lazy(() => import('../../pages/cores/SignInPage.jsx')),
    SignUpPage = lazy(() => import('../../pages/cores/SignUpPage.jsx')),
    HomePage = lazy(() => import('../../pages/cores/HomePage.jsx')),
    GroupFundPage = lazy(() => import('../../pages/GroupFundPage.jsx')),
    NewFund = lazy(() => import('../../components/GroupFund/NewFund.jsx')),
    FundDetailPage = lazy(() => import('../../components/GroupFund/FundDetailPage.jsx')),
    Dashboard = lazy(() => import('../../components/admin/dashboard/Dashboard.jsx')),
    PartnerLayoutAdmin = lazy(() => import('../../pages/admin/layout-admin/partner-manage/PartnerLayout.jsx')),
    StatisticalLayout = lazy(() => import('../../pages/admin/layout-admin/statistics-manage/StatisticalLayout.jsx')),
    EmployeeLayout = lazy(() => import('../../pages/admin/layout-admin/employee-manage/EmployeeLayout.jsx')),
    WithdrawPage = lazy(() => import('../../pages/cores/WithdrawPage.jsx')),
    TransferMoney = lazy(() => import('../../components/payment/TransferMoney.jsx')),
    AddAtmPage = lazy(() => import('../../components/atm/AddAtmForm.jsx')),
    TransactionDetailPage = lazy(() => import('../../pages/cores/TransactionDetailPage.jsx')),
    TicketPage = lazy(() => import('../../components/support-ticket/TicketPage.jsx')),
    TicketRequestSuccess = lazy(() => import('../../components/support-ticket/TicketRequestSuccess.jsx')),
    TicketDetail = lazy(() => import('../../components/support-ticket/TicketDetail.jsx')),
    LayoutTransaction = lazy(() => import('../../pages/admin/layout-admin/transaction-manage/LayoutTransaction.jsx')),
    BankLayout = lazy(() => import('./../../pages/admin/layout-admin/transaction-manage/manage/bank/BankLayout.jsx')),
    ServiceTransaction = lazy(
        () => import('./../../pages/admin/layout-admin/transaction-manage/manage/ServiceTransaction.jsx')),
    WalletLayout = lazy(() => import('./../../pages/admin/layout-admin/transaction-manage/manage/bank/BankLayout.jsx')),
    AllWalletTransaction = lazy(
        () => import('./../../pages/admin/layout-admin/transaction-manage/manage/wallet/AllWalletTransaction.jsx')),
    TransferWallet = lazy(
        () => import('./../../pages/admin/layout-admin/transaction-manage/manage/wallet/TransferWallet.jsx')),
    AllBankTransaction = lazy(
        () => import('./../../pages/admin/layout-admin/transaction-manage/manage/bank/AllBankTransaction.jsx')),
    TransferBank = lazy(
        () => import('./../../pages/admin/layout-admin/transaction-manage/manage/bank/TransferBank.jsx')),
    InfoAccount = lazy(() => import('../../components/account/InfoAccount.jsx')),
    CareCustomerLayout = lazy(() => import('../../pages/admin/layout-admin/care-cus-manage/CareCustomerLayout.jsx')),
    OverviewCare = lazy(() => import('./../../pages/admin/layout-admin/care-cus-manage/OverviewCare.jsx')),
    RequestCustomer = lazy(() => import('./../../pages/admin/layout-admin/care-cus-manage/RequestCustomer.jsx')),
    ManagementPersonalInfo = lazy(() => import('../../components/account/ManagementPersonalInfo.jsx')),
    IdentityAuth = lazy(() => import('../../components/account/IdentityAuth.jsx')),
    ManualIdentityAuth = lazy(() => import('../../components/account/ManualIdentityAuth.jsx'));

export const router = createBrowserRouter([
  {
    path: 'admin1',
    element: <AdminDashboard/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: 'user-transactions/:email?',
        element: <CustomerTransactionLayout/>,
      },
      {
        path: 'user-transactions',
        element: <CustomerTransactionLayout/>,
      }, {
        path: 'wallet-transaction', element: <WalletLayout/>,
        children: [
          {
            index: true, element: <AllWalletTransaction/>,
          }, {
            path: 'all', element: <AllWalletTransaction/>,
          }, {
            path: 'transfer', element: <TransferWallet/>,
          },
        ],
      }, {
        path: 'service-transaction', element: <ServiceTransaction/>,
      }, {
        path: 'bank-transaction', element: <BankLayout/>,
        children: [
          {
            index: true, element: <AllBankTransaction/>,
          }, {
            path: 'all', element: <AllBankTransaction/>,
          }, {
            path: 'transfer', element: <TransferBank/>,
          },
        ],
      }, {
        path: 'transaction-manage',
        element: <LayoutTransaction/>,
      }, {
        path: 'care-cus-manage',
        element: <CareCustomerLayout/>,
        children: [
          {
            index: true, element: <OverviewCare/>,
          }, {
            path: 'overview', element: <OverviewCare/>,
          }, {
            path: 'chat', element: <OverviewCare/>,
          }, {
            path: 'request', element: <RequestCustomer/>,
          },
        ],
      }
      , {
        path: 'customer-manage',
        element: <CustomerLayout/>,
      },
      {
        path: 'partner-manage',
        element: <PartnerLayoutAdmin/>,
      }, {
        path: 'statistic-manage',
        element: <StatisticalLayout/>,
      }, {
        path: 'employee-manage',
        element: <EmployeeLayout/>,
      },
      {
        path: 'role-manage',
        element: <RoleLayout/>,
      },
      {
        path: 'setting',
        element: <SettingLayout/>,
      },
    ],
  }, {
    path: 'admin',
    element: <AuthorizedView ROLE={'ADMIN'}/>,
    children: [],
  }, {
    path: '/partner',
    element: <PartnerLayout/>,
    children: [
      {
        path: 'api-key',
        element: <ApiKeyPage/>,
      },
    ],
  }, {
    path: '/',
    element: <ProtectedLayout/>,
    children: [
      {
        path: 'application',
        children: [
          {
            path: '',
            element: <ApplicationManager/>,
          },
          {
            path: ':id',
            element: <AppPartnerLayout/>,
          },
        ],
      },
      {
        element: <MainLayout/>,
        children: [
          {
            path: 'home',
            element: <HomePage/>,
          }, {
            path: 'top-up',
            element: <TopUp/>,
          }, {
            path: 'withdraw',
            element: <WithdrawPage/>,
          }, {
            path: 'transfer',
            element: <TransferMoney/>,
          }, {
            path: 'transaction/:id',
            element: <TransactionDetailPage/>,
          }, {
            path: 'me',
            element: <MyWallet/>,
          }, {
            path: 'order/:id?',
            element: <ServicePayment/>,
          }, {
            path: 'history',
            element: <TransactionHistoryPage/>,
          }, {
            path: 'bank',
            element: <AtmPage/>,
          }, {
            path: 'bank/add',
            element: <AddAtmPage/>,
          }, {
            path: 'analysis',
            element: <AnalysisPage/>,
          }, {
            path: 'qr-payment',
            element: <QRPayment/>,
          }, {
            path: 'group-fund',
            element: <GroupFundPage/>,
          }, {
            path: 'group-fund/new-group',
            element: <NewFund/>,
          }, {
            path: 'fund/:id?',
            element: <FundDetailPage/>,
          }, {
            path: 'support-ticket',
            element: <TicketPage/>,
          }, {
            path: 'ticket-detail/:id',
            element: <TicketDetail/>,
          }, {
            path: 'ticket-success',
            element: <TicketRequestSuccess/>,
          }, {
            path: 'management-personal',
            element: <ManagementPersonalInfo/>,
            children: [
              {
                index: true, element: <InfoAccount/>,
              }, {
                path: 'info-account', element: <InfoAccount/>,
              }, {
                path: 'identity-auth', element: <IdentityAuth/>,
              }, {
                path: 'manual-auth', element: <ManualIdentityAuth/>,
              },
            ],
          },
        ],
      },
    ],
    errorElement: <PageNotFound/>,
  }, {
    children: [
      {
        path: '/',
        element: <MainLayout/>,
        children:
            [
              {
                path: '/',
                index: true,
                element: <IntroPage/>,
              },
            ],
      },
      {
        path: '/sign-in',
        element: <SignInPage/>,
      }, {
        path: '/sign-up',
        element: <SignUpPage/>,
      }, {
        path: 'password',
        children: [
          {
            path: 'reset',
            element: <ResetPasswordPage/>,
          }, {
            path: 'change',
            element: <ResetPasswordPage/>,
          },
        ],
      }, {
        path: callBackUrl,
        element: <CallBackHandler/>,
      },
    ],
  },
]);