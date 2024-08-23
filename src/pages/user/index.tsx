import React, { useEffect } from "react";
import Profile from "../../components/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { fetchUser, logout } from "../../redux/auth/actions";
import { useNavigate } from "react-router-dom";

interface UserDashboardProps {
  token: string;
}

const UserDashboard = ({ token }: UserDashboardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    } else {
      fetchUser(token)(dispatch);
    }
  }, [dispatch, token, navigate]);

  function handleLogout() {
    logout()(dispatch);
    navigate("/login");
  };


  if (error) {
    console.error(error);
    navigate("/login");
    return null;
  };

  if (!user && loading) {
    return <h1>Loading...</h1>; 
  };
  return <Profile user={user} logout={handleLogout} />;
};

export default UserDashboard;
