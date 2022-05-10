import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, championSearch:string) {
    if(value.length === 0 || championSearch === '') {
      return value;
    };
    const displayArray = [];
    for(let champ of value){
      if (champ.value.name.toLocaleLowerCase().includes(championSearch.toLocaleLowerCase())){
        displayArray.push(champ)
      };
    };
    return displayArray;
  }
}
