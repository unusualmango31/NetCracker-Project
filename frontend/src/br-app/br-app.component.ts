import {
    ChangeDetectionStrategy,
    Component,
} from "@angular/core";

@Component({
    selector: "br-app-root",
    templateUrl: "./br-app.component.html",
    styleUrls: ["./br-app.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrAppComponent {
    title = 123;
}
