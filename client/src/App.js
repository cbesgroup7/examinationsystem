import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/login';
import Instruction from './components/instructions';
import Demo from './components/demo';
import Session from './components/section';
import Exam from './components/exam';
import Feedback from './components/feedback';
import { AuthorizeStudent } from './middleware/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element : <Login></Login>
  },
  {
    path: '/instruction',
    element : <AuthorizeStudent><Instruction /></AuthorizeStudent>
  },
  {
    path: '/Demo',
    element : <AuthorizeStudent> <Demo /> </AuthorizeStudent>
  },
  {
    path: '/Session',
    element :  <AuthorizeStudent><Session /></AuthorizeStudent>
  },
  {
    path: '/Exam',
    element :  <AuthorizeStudent><Exam /></AuthorizeStudent>
  },
  {
    path: '/Feedback',
    element :  <AuthorizeStudent><Feedback /></AuthorizeStudent>
  },
]);
function App() {
  
  return (
    <div className="App">
         <RouterProvider router={router}></RouterProvider> 
    </div>
  );
}

export default App;
