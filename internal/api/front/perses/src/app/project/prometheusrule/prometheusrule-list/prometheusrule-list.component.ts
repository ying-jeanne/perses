// Copyright 2021 Amadeus s.a.s
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnInit } from '@angular/core';
import { PrometheusRuleService } from '../prometheusrule.service';
import { PrometheusRuleModel, RuleGroup } from '../prometheusrule.model';
import { ToastService } from '../../../shared/service/toast.service';

@Component({
  selector: 'app-prometheusrule-list',
  templateUrl: './prometheusrule-list.component.html',
  styleUrls: ['./prometheusrule-list.component.scss']
})
export class PrometheusRuleListComponent implements OnInit {

  isLoading = false;
  rules: PrometheusRuleModel[] = [];

  constructor(private service: PrometheusRuleService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getRules();
  }

  public countRules(groups: RuleGroup[]): number {
    let result = 0;
    for (const group of groups) {
      result = result + group.rules.length;
    }
    return result;
  }

  private getRules(): void {
    this.isLoading = true;
    this.service.list('perses').subscribe(
      responses => {
        this.rules = responses;
        this.isLoading = false;
      },
      error => {
        this.toastService.error(error);
        this.isLoading = false;
      },
    );
  }
}
