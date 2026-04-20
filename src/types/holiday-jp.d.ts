declare module "holiday-jp" {
  export function isHoliday(date: Date): boolean;
  export function getHolidays(
    year: number,
  ): Array<{ date: Date; name: string }>;
}
