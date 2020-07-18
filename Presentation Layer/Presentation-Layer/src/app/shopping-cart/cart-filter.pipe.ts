import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'cartfilter'
})

export class cartfilterPipe implements PipeTransform{
    transform(details: any, searchTerm:any): any{
        if(searchTerm === undefined){
            return null;
        }
            //returning products that matches with searched word
           return details.filter(function(detail){
               return detail.userId == (searchTerm);
        
        })
        
    }
    
}