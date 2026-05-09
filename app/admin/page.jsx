"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, LogOut, Layout, MessageSquare, Users, Inbox } from 'lucide-react';
import './Admin.css';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [consultations, setConsultations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newProject, setNewProject] = useState({
    title: '', category: 'Residential', description: '', tools: '', imageUrl: '', beforeImageUrl: ''
  });
  
  const [newTestimonial, setNewTestimonial] = useState({
    clientName: '', review: '', rating: 5, imageUrl: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setIsLoggedIn(true);
  }, []);

  const fetchConsultations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`/api/admin/consultations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConsultations(res.data);
    } catch (err) {
      console.error('Failed to fetch consultations');
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`/api/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects');
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`/api/testimonials`);
      setTestimonials(res.data);
    } catch (err) {
      console.error('Failed to fetch testimonials');
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`/api/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch messages');
    }
  };

  const [blogPosts, setBlogPosts] = useState([]);
  const [newBlogPost, setNewBlogPost] = useState({
    title: '', excerpt: '', content: '', imageUrl: ''
  });

  const fetchBlogPosts = async () => {
    try {
      const res = await axios.get(`/api/blog`);
      setBlogPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch blog posts');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchConsultations();
      fetchProjects();
      fetchTestimonials();
      fetchBlogPosts();
      fetchMessages();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/login`, credentials);
      localStorage.setItem('adminToken', res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-wrapper" style={{ paddingTop: '150px' }}>
        <div className="login-card">
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Admin Portal</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input type="text" placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
            <input type="password" placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            <button type="submit" className="btn-primary">Authenticate</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container" style={{ paddingTop: '100px' }}>
      <div className="admin-sidebar">
        <div className="sidebar-brand">M<span>.</span> ADMIN</div>
        <nav>
          <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}><Layout size={18} /> Projects</button>
          <button className={activeTab === 'testimonials' ? 'active' : ''} onClick={() => setActiveTab('testimonials')}><MessageSquare size={18} /> Reviews</button>
          <button className={activeTab === 'blog' ? 'active' : ''} onClick={() => setActiveTab('blog')}><Layout size={18} /> Blog</button>
          <button className={activeTab === 'leads' ? 'active' : ''} onClick={() => setActiveTab('leads')}><Users size={18} /> Leads</button>
          <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}><Inbox size={18} /> Messages</button>
        </nav>
        <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Logout</button>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
        </div>
        <div className="admin-content">
          <p style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
            Admin functionalities are currently being migrated to Next.js API routes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
