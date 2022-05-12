import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cooldown',
})
export class CooldownPipe implements PipeTransform {
  transform(cooldown: any) {
    return cooldown.join(' / ');
  }
}
