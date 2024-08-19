import { CepData } from "../../home/types";

export interface MapModalProps {
    show: boolean;
    handleClose: () => void;
    cep: CepData | null;
}