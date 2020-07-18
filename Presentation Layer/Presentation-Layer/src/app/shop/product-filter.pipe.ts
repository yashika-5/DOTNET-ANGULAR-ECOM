import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'productfilter'
})

export class productfilterPipe implements PipeTransform{
    transform(products: any, searchTerm:any): any{
        if(searchTerm === undefined){
            return products;
        }
            //returning products that matches with searched word
           return products.filter(function(product){
               return product.productName.toLowerCase().includes(searchTerm.toLowerCase());
        
        })
        
    }
    
}