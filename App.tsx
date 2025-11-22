import React, { useState } from 'react';
import { AppView, UserProfile } from './types';
import { MOCK_USER } from './constants';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Nutrition } from './components/Nutrition';
import { Fitness } from './components/Fitness';
import { WellnessBeauty } from './components/WellnessBeauty';
import { Progress } from './components/Progress';
import { Auth } from './components/Auth';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.AUTH);
  const [user] = useState<UserProfile>(MOCK_USER);

  const handleLogin = () => {
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentView(AppView.AUTH);
  };

  if (currentView === AppView.AUTH) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard user={user} onChangeView={setCurrentView} />;
      case AppView.NUTRITION:
        return <Nutrition />;
      case AppView.FITNESS:
        return <Fitness />;
      case AppView.WELLNESS:
        return <WellnessBeauty />;
      case AppView.PROGRESS:
        return <Progress />;
      default:
        return <Dashboard user={user} onChangeView={setCurrentView} />;
    }
  };

  return (
    <Layout 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        user={user}
        onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;