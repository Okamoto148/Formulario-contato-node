import Head from 'next/head';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from './Components/Formulario';





export default function Home() {
 const [formulario, setFormulario]=useState(false);





   
  return (
    <main>
      <Head>
  <title>Formulário de indicação</title>
  <meta name='description' content='Generated by create next app' />
  <link rel='icon' href='./minilogo.jpg' />
</Head>
      <Header />
      
      {!formulario&&<><img src='./img/formulario.jpg' style={{float: 'right'}}/>
  <h1 style={{fontSize: '50px', marginTop: '120px'}}>Nos ajude a aumentar o time!</h1>
        <p style={{fontSize: '15px', color: 'lightgray', marginTop: '-10px;'}}>Cresça conosco e receba benefícios adicionais no Caju!</p>
        
        <button type="button" className="btn btn-primary" onClick={e=>setFormulario(true)}>Clique aqui</button></>}

      {(formulario)&&<Formulario />}

     
    
   
   

    </main>
    
  )
}
