import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Obrigado from './Obrigado';

export default function Formulario({childToParent}){
const [campos, setCampos] = useState({
      nome: '',
      email: '',
      mensagem: '',
      indicado: '',
      anexo: ''
  });

  const [obrigado,setObrigado]=useState(false);


 
  
  function handleInputChange(event){
    if(event.target.name === "anexo")
      campos[event.target.name] = event.target.files[0];
    else
      campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  function send(){
    const formData = new FormData();
    Object.keys(campos).forEach(key => formData.append(key, campos[key]));
    axios.post('./sendmail', 
              formData,
              {
                headers: {
                 "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                }
              })
      .then(response => { console.log(response.data); })
  }

  function handleFormSubmit(event){ 
    event.preventDefault(); 
    console.log(campos); 
    send(campos);
    setObrigado(true);
  
    
    
  }

  return(
    <>
      {!obrigado&&<section style={{display: 'flex'}}>
         <div> <img src='./img/programador.jpg' style={{width: '80%'}} />
    <div style={{fontSize: '10px', marginTop: '90px'}}><a href="https://br.freepik.com/vetores-gratis/composicao-de-cartas-de-caixa-de-correio-realista-com-caixa-de-correio-classica-e-envelopes-de-papel-para-cartas_6801377.htm#query=caixa%20correio&position=6&from_view=search&track=sph">Imagem de macrovector</a> no Freepik</div></div>
<div style={{width: '30%', marginRight: '110px', border: '1px solid lightgray', borderRadius: '10px', padding:'1em' }}>
  <div style={{fontWeight: 'bold', height: '40px', fontSize: '25px', marginBottom: '15px'}}>Faça a indicação!</div>

  <form onSubmit={handleFormSubmit}>
       <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Nome</label>
  <input type="text" className="form-control" placeholder="Seu nome" id="nome" name="nome"  onChange={handleInputChange}/>
</div>
  
       <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Indicado</label>
  <input type="text" className="form-control"  placeholder="Nome completo do indicado" id="indicado" name="indicado"  onChange={handleInputChange}/>
</div>
  
         <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">E-mail</label>
  <input type="email" className="form-control"  placeholder="Seu e-mail" id="email" name="email" onChange={handleInputChange} />
</div>

  <div className="mb-3">
  <label htmlFor="formFile" className="form-label">Currículo</label>
  <input className="form-control" type="file" id="anexo" name="anexo" onChange={handleInputChange} />
</div>
  
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Comentários (opcional)</label>
  <textarea className="form-control" rows="3" id="mensagem" name="mensagem" onChange={handleInputChange}/>
</div>
    

            <button type="submit" value='submit' className="btn btn-primary">Enviar</button>
      </form>
  </div>
  
            
            </section>}

      {obrigado&&<Obrigado />}
    </>
      )
}