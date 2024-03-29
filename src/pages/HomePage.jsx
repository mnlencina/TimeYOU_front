import { useState } from "react";
import styled from "styled-components";
import {
  CardContext,
  Drawer,
  Pagination,
} from "../components/index.js";
import { useSelector } from "react-redux";
import { Loader } from "../components/Loader/Loader.jsx";
import { ContainerLoader } from "../utils/ComponentsStyle.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar.jsx";



export default function HomePage() {
  
  const navigate = useNavigate();
  
  const user = useSelector((state)=> state.user)
  const { Clocks, allClocks, searchActive } = useSelector((state) => state);
  const whatches = searchActive ? Clocks : allClocks;
  
  const watchDel1 = whatches.filter(watch => watch.stock > 0);
  const watchDel = watchDel1.filter(watch => watch.del === false);

  const loading = useSelector((state) => state.isLoading);

  const [show, setShow] = useState(false);

  //const showOpen = show.toString();

  //funciones de paginacion
  const [page, setPage] = useState(1);
  const itemPerPage = 12;
  const totalPages = Math.ceil(watchDel && (watchDel.length / itemPerPage)) 

  const paginacion = () => {
    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    if (watchDel && watchDel.length) return watchDel.slice(startIndex, endIndex);
  };

  const PaginacionRelojes = paginacion()

  const onNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onPreviusPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const renderMostrador = () => (
    <ContainerMostrador show={show}>
    
      <div className="sidebar">
        <div className="btn-filter">
          <button onClick={() => setShow(!show)}>filtros</button>
        </div>
         {/* <Drawer show={show} setPage={setPage} /> */}
      </div>
      <section className="main-card">
        <CardContext pagination={PaginacionRelojes}  />
      </section>
    </ContainerMostrador>
  );

  const renderLoader = () => (
    <ContainerLoader>
      <Loader />
    </ContainerLoader>
  );
  
  if (user.del) {
    navigate("/home/loginout")   
  }

  return (
    <>
      {loading ? (
        renderLoader()
      ) : (
        <>
          
          <Pagination
            totalPages={totalPages}
            page={page}
            onPrev={onPreviusPage}
            onNext={onNextPage}
          />
          {renderMostrador()}
          <Pagination
            totalPages={totalPages}
            page={page}
            onPrev={onPreviusPage}
            onNext={onNextPage}
          />
          <Sidebar setPage={setPage}/>
        </>
      )}
      
      
    </>
  );
}

const ContainerMostrador = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  
  .sidebar {
    width: 0;
    
    background-color: #111;
    transition: 0.5s ease-in-out;
    position: relative;
    border-radius: 0 10px 10px 0;
    display: flex;
    
    .btn-filter {
      position: absolute;
      /* left: 0;
      top: 0; */
      left: -58px;
      top: 40px;
      transition: all 0.5s ease-in-out;
      
      transition: 3s;
      button {
        

        /* width: 35px;
        height: 150px;
        writing-mode: vertical-rl; */
        
        width: 150px;
        height: 35px;
        rotate: -90deg;
        background-color: #000000;
        border: none;
        border-radius: 0px 0px 10px 10px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 7px;
        transition: 0.3s;
        
        &:hover {
          left: 100px;
          transition: all 0.5s ease-in-out;
          //opacity: 0;
          transform: scale(1.1);
          border-right: none;
        }
      }
    }
  }
  .main-card {
    width:100%;
    min-height: 500px;
    height: 100%;
    transition: all 0.5s ease-in-out;
    display: grid;
    place-content: center;
  }
`;
