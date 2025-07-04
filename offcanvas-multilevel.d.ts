import * as jquery from "jquery";

export interface OffCanvasMenuSettings {
	side?: "left" | "right";
	width?: string;
	breakpoint?: string;
	zIndex?: number;
	bgColor?: string;
	textColor?: string;
	headerBg?: string;
	borderColor?: string;
	linkHover?: string;
	transitionDuration?: number;
	transitionEasing?: string;
	overlay?: boolean;
	trapFocus?: boolean;
	closeOnEsc?: boolean;
	closeOnOverlay?: boolean;
	navSelector?: string;
	containerClass?: string;
	panelClass?: string;
	levelClass?: string;
	headerClass?: string;
	listClass?: string;
	itemClass?: string;
	linkClass?: string;
	btnClass?: string;
	btnToggleClass?: string;
	btnCloseClass?: string;
	btnBackClass?: string;
	btnHomeClass?: string;
	svg?: Record<string, string>;
	onInit?: (instance: OffCanvasMenu) => void;
	onOpen?: (instance: OffCanvasMenu) => void;
	onClose?: (instance: OffCanvasMenu) => void;
	onNavigate?: (level: number, items: any[]) => void;
	onLevelChange?: (level: number) => void;
}

export class OffCanvasMenu {
	constructor($nav: jquery.JQuery, opts?: OffCanvasMenuSettings);
	open(): void;
	close(): void;
	toggle(): void;
	back(): void;
	jumpTo(level: number): void;
}

declare module "jquery" {
	interface JQuery {
		offCanvasMenu(opts?: OffCanvasMenuSettings): jquery.JQuery;
	}
}
