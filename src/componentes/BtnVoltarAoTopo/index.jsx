import React, { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import { animateScroll as scroll } from 'react-scroll';
import estilos from "./BtnVoltarAoTopo.module.css";
import appEstilos from "../../App.module.css";
import {Icon} from "@iconify/react";

function BtnVoltarAoTopo() {
    const { page } = useAppContext();
    const [isVisible, setIsVisible] = useState(false);

    const handleScrollToTop = () => {
        scroll.scrollToTop();
    };

    useEffect(() => {
        const toggleVisibility = () => {
            // Verifica se a posição do scroll é diferente do topo
            if (window.scrollY > 100 && page > 1 && window.innerWidth > 768) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [page]);

    return (
        <div className={`${appEstilos.DfRow} ${estilos.DivVoltarAoTopo}`}>
            {isVisible && (
                <div className={estilos.VoltarAoTopo} onClick={handleScrollToTop}>
                    <Icon icon="raphael:arrowup" />
                </div>
            )}
        </div>
    );
}
export default BtnVoltarAoTopo;