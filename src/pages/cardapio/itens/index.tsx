import cardapio from './itens.json';
import Item from './item';
import styles from './Itens.module.scss';
import { useEffect, useState } from 'react';

interface IProps {
  busca: string,
  filtro: number | null,
  ordenador: string
}

export default function Itens(props: IProps) {

  const [lista, setLista] = useState(cardapio);

  const { busca, filtro, ordenador } = props;

  function testaBusca(title: string) {
    const regex = new RegExp(busca, 'i');

    return regex.test(title);
  }

  function testaFiltro(id: number) {
    if (filtro !== null) return filtro === id;
    return true;
  }

  function ordenar(novaLista: typeof cardapio) {
    switch (ordenador) {
      case 'porcao':
        return ordenarPropriedade(novaLista, 'size', 'crescente');
      case 'qtd_pessoas':
        return ordenarPropriedade(novaLista, 'serving', 'crescente');
      case 'preco_crescente':
        return ordenarPropriedade(novaLista, 'price', 'crescente');
      case 'preco_decrescente':
        return ordenarPropriedade(novaLista, 'price', 'decrescente');
      default:
        return novaLista;
    }
  }

  function ordenarPropriedade(lista: typeof cardapio, propriedade: 'size' | 'serving' | 'price' , sentido: 'crescente' | 'decrescente') {
    if (sentido == 'crescente') {
      return lista.sort((a, b) => (a[propriedade] > b[propriedade] ? 1 : -1));
    }
    return lista.sort((a, b) => (a[propriedade] < b[propriedade] ? 1 : -1));
  };

  useEffect(() => {
    const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id));
    setLista(ordenar(novaLista));
  }, [busca, filtro, ordenador]);

  return (
    <div>
      <div className={styles.itens}>
        {lista.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
