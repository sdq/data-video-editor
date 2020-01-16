//import React, { Component } from 'react';
import EditorView from '../views/EditorView';
import ProjectView from '../views/ProjectView';
import LoginView from '../views/User';
import RegisteView from '../views/User/Registe/RegisteView';

export default [
    { path: '/', component: LoginView },
    { path: "/index", component: EditorView, auth: true },
    { path: "/register", component: RegisteView },
    { path: "/projects", component: ProjectView },
    { path: "/editor", component: EditorView }
]



