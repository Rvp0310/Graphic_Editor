export type Slide = {
  id: string;
  template: "title" | "content";
  canvasData: any;
  history: string[];
  historyIndex: number;
};