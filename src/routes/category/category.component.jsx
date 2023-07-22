import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/category/category.selector';

import {CategoryContainer, Title} from './category.styles.jsx'
import ProductCard from '../../components/product-cart/product-card.component';

const Category = () => {
   const { category } = useParams();
   const categoriesMap = useSelector(selectCategoriesMap);
   const [products, setProducts] = useState(categoriesMap[category]);

   useEffect(() => {
    setProducts(categoriesMap[category])
   }, [category, categoriesMap])

   return (
    <Fragment>
        <Title>{category.toUpperCase()}</Title>
        <CategoryContainer>
            {products &&
                products.map((product) => <ProductCard key={product.id} product={product}/>)
            }
        </CategoryContainer>
    </Fragment>
   )
}

export default Category;