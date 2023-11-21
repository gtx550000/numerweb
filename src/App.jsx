import { useState } from 'react'
import ButtonAppBar from './component/appbar/appbar';
import TemporaryDrawer from './component/sideber/sideber';
import Bisection from './component/Bisection/Bisection';
import Graphical_method from './component/Graphical_method/Graphical_method';
import False_Position_Method from './component/False_Position_Method/False_Position_Method';
import One_point_Iteration from './component/One_point_Iteration/One_point_Iteration'
import Newton_Raphson from './component/Newton_Ralpson/Newton_Ralpson';
import Cramer_rule from './component/Cramer_rule/Cramer_rule';
import Guaess_elimination from './component/Guaess_elimination/Guaess_elimination';
import Gaussian_Jordan from './component/Guaess_Jordan/Guaess_Jordan';
import Matrix_Inversion from './component/Matrix_Inversion/Matrix_Inversion';
import LU_Decomposite from './component/LU_Decomposite/LU_Decomposite';
import Guaess_Seidel from './component/Guaess_Seidel/Guaess_Seidel';
import Conjugate_Gradient from './component/Conjugate_Gradient/Conjugate_Gradient';
import Jacobi_Iteration from './component/Jacobi_Iteration/Jacobi_Iteration';
import Polynomial from './component/Polynomial/Polynomial';
import CUBIC_SPLINE from './component/CUBIC_SPLINE/CUBIC_SPLINE';
import ORDINARY_DIFFERENTIAL from './component/ORDINARY_DIFFERENTIAL/ORDINARY_DIFFERENTIAL'
import Lagrange from './component/Lagrange/Lagrange';

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
function App() {
  

  return (
    <Router>
    <div>
      <ButtonAppBar></ButtonAppBar>
      
      <Routes>
         <Route path='/Bisection' element={<Bisection/>}></Route>
         <Route path='/Graphical_method' element={<Graphical_method/>}></Route>
         <Route path='/False_Position_Method' element={<False_Position_Method/>}></Route>
         <Route path='/One_point_Iteration' element={<One_point_Iteration/>}></Route>
         <Route path='/Newton_Raphson' element={<Newton_Raphson/>}></Route>
         <Route path='/Cramer_rule' element={<Cramer_rule/>}></Route>
         <Route path='/Guaess_elimination' element={<Guaess_elimination/>}></Route>
         <Route path='/Gaussian_Jordan' element={<Gaussian_Jordan/>}></Route>
         <Route path='/Matrix_Inversion' element={<Matrix_Inversion/>}></Route>
         <Route path='LU_Decomposite' element={<LU_Decomposite/>}></Route>
         <Route path='/Guaess_Seidel' element={<Guaess_Seidel/>}></Route>
         <Route path='/Conjugate_Gradient' element={<Conjugate_Gradient/>}></Route>
         <Route path='/Jacobi_Iteration' element={<Jacobi_Iteration/>}></Route>
         <Route path='/Polynomial' element={<Polynomial/>}></Route>
         <Route path='/CUBIC_SPLINE' element={<CUBIC_SPLINE/>}></Route>
         <Route path='/ORDINARY_DIFFERENTIAL' element={<ORDINARY_DIFFERENTIAL/>}></Route>
         <Route path='/Lagrange' element={<Lagrange/>}></Route>

      </Routes>
    </div>
    </Router>
  );
  
}

export default App;
