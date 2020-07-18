import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "categoryfilter"
})
export class categoryfilterPipe implements PipeTransform {
  transform(products: any, select?: any): any {
    //comparing selected value with existing categories
    if (select !== "All") {
      return select
        ? products.filter(product => product["categoryId"] === select)
        : products;
    } else {
      //returning all products if no category selected
      return products;
    }
  }
}