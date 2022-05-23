import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favoritesFilter',
})
export class FavoritesFilterPipe implements PipeTransform {
  transform(value: any, championSearch: string) {
    if (value.length === 0 || championSearch === '') {
      return value;
    }
    const displayArray = [];
    for (let champ of value) {
      if (
        champ.name
          .toLocaleLowerCase()
          .includes(championSearch.toLocaleLowerCase())
      ) {
        displayArray.push(champ);
      }
    }
    return displayArray;
  }
}
