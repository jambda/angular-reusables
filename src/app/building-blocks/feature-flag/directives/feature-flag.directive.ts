import {DestroyRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {FeatureFlag} from "../types/feature-flag";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FeatureFlagService} from "../services/feature-flag.service";

@Directive({
  selector: '[appFeatureFlag]',
  standalone: true,
})
export class FeatureFlagDirective implements OnInit {
  @Input({required: true}) public appFeatureFlag?: FeatureFlag;

  constructor(
    private readonly featureFlagService: FeatureFlagService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<unknown>,
    private readonly destroyRef: DestroyRef,
  ) {}

  public ngOnInit(): void {
    this.featureFlagService
      .isFeatureEnabled(this.appFeatureFlag)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isFeatureEnabled) => {
        if (isFeatureEnabled) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }
}
