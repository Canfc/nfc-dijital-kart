import type {
  ComponentType,
} from "react";

import type {
  BusinessTemplateProps,
} from "./types";

import CafePremium from "./CafePremium";
import RestaurantDark from "./RestaurantDark";
import PersonalPremium from "./PersonalPremium";
import MinimalBusiness from "./MinimalBusiness";

/*
  İŞLETMEYE ÖZEL TASARIMLAR

  Daha sonra örneğin:

  import KebapciAliCustom
    from "./custom/KebapciAliCustom";

  const customTemplates = {
    "kebapci-ali": KebapciAliCustom,
  };

  şeklinde ekleyebiliriz.
*/

const customTemplates: Record<
  string,
  ComponentType<BusinessTemplateProps>
> = {};

export function getBusinessTemplate(
  slug: string,
  template?: string | null
): ComponentType<BusinessTemplateProps> {
  /*
    Öncelik her zaman
    işletmeye özel tasarımda.
  */

  if (customTemplates[slug]) {
    return customTemplates[slug];
  }

  switch (template) {
    case "Restaurant Dark":
      return RestaurantDark;

    case "Personal Premium":
      return PersonalPremium;

    case "Minimal Business":
      return MinimalBusiness;

    case "Cafe Premium":
    default:
      return CafePremium;
  }
}