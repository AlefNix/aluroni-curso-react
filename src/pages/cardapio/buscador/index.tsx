import styles from './Buscador.module.scss';
import {CgSearch} from 'react-icons/cg'

interface Props {
    busca: string,
    setBusca: React.Dispatch<React.SetStateAction<string>>,
    stringPlaceholder: string | undefined
}

export default function Buscador({busca, setBusca, stringPlaceholder}: Props) {
    return(
        <div className={styles.buscador}>
            <input 
                value={busca} 
                onChange={(e) => setBusca(e.target.value)}
                placeholder={stringPlaceholder}
            />
            <CgSearch size={20} color='#4c4d5f'/>
        </div>
    )
}