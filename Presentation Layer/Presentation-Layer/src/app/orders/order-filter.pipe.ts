import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'orderfilter'
})

export class orderfilterPipe implements PipeTransform{
    transform(items: any, searchTerm:any): any{
        if(searchTerm === undefined){
            return null;
        }
            //returning products that matches with searched word
           return items.filter(function(item){
               return item.userId == (searchTerm);
        
        })
        
    }
    
}