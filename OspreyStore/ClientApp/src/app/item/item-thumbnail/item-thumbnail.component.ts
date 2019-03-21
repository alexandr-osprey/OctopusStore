import { Component, OnInit, Input } from '@angular/core';
import { ParameterNames } from '../../parameter/parameter-names';
import { ItemThumbnail } from '../item-thumbnail';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-thumbnail',
  templateUrl: './item-thumbnail.component.html',
  styleUrls: ['./item-thumbnail.component.css']
})
export class ItemThumbnailComponent implements OnInit {
  @Input() itemThumbnail: ItemThumbnail;
  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    if (this.itemThumbnail) {
      this.setMinMaxPrices(this.itemThumbnail);
    }
  }

  getDetailUrl(itemId: number): string {
    //let str = this.itemService.getUrlWithIdWithSuffix(itemId, ParameterNames.detail);
    return this.itemService.getUrlWithIdWithSuffix(itemId, ParameterNames.detail, '/items/');
  }

  setMinMaxPrices(itemThumbnail: ItemThumbnail) {
    itemThumbnail.minPrice = Math.max(Math.min(...itemThumbnail.prices), 0);
    itemThumbnail.maxPrice = Math.max(Math.max(...itemThumbnail.prices), 0);
  }
}