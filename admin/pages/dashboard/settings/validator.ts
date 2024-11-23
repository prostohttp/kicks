import type { FormError } from "#ui/types";
import { locale } from "~/lang/locale";
import type { SettingsDto } from "~/server/api/settings/dto/settings.dto";
import { SettingsCurrency, SettingsLocale } from "~/types/ui/ui.types";

export const validate = (state: SettingsDto): FormError[] => {
    const errors = [];

    // General
    // if (!state.image) {
    //   errors.push({
    //     path: "logo",
    //     message: locale[useSettingsDataStore().locale].error.required,
    //   });
    // }

    if (
        state.localeDashboard.value !== SettingsLocale.en &&
        state.localeDashboard.value !== SettingsLocale.ru
    ) {
        errors.push({
            path: "localeDashboard",
            message: locale[useSettingsDataStore().locale].error.wrongType,
        });
    }

    if (
        state.localeStore.value !== SettingsLocale.en &&
        state.localeStore.value !== SettingsLocale.ru
    ) {
        errors.push({
            path: "localeStore",
            message: locale[useSettingsDataStore().locale].error.wrongType,
        });
    }

    if (
        state.currency.value !== SettingsCurrency.rub &&
        state.currency.value !== SettingsCurrency.usd
    ) {
        errors.push({
            path: "currency",
            message: locale[useSettingsDataStore().locale].error.wrongType,
        });
    }

    if (
        state.mainCurrency.value !== SettingsCurrency.rub &&
        state.mainCurrency.value !== SettingsCurrency.usd
    ) {
        errors.push({
            path: "mainCurrency",
            message: locale[useSettingsDataStore().locale].error.wrongType,
        });
    }

    if (state.secondCurrencyRate < 0.01) {
        errors.push({
            path: "secondCurrencyRate",
            message: locale[useSettingsDataStore().locale].error.notZero,
        });
    }

    if (!state.startOrderStatus) {
        errors.push({
            path: "startOrderStatus",
            message: locale[useSettingsDataStore().locale].error.required,
        });
    }

    if (!state.endOrderStatus) {
        errors.push({
            path: "endOrderStatus",
            message: locale[useSettingsDataStore().locale].error.required,
        });
    }

    // Locales eng
    if (!state.en.title) {
        errors.push({
            path: "en.title",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }

    if (!state.en.description) {
        errors.push({
            path: "en.description",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }
    // TODO: Регулярка почта
    if (!state.en.email) {
        errors.push({
            path: "en.email",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }

    if (!state.en.address) {
        errors.push({
            path: "en.address",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }
    // TODO: Регулярка телефон
    if (!state.en.phone) {
        errors.push({
            path: "en.phone",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }
    // Locales rus
    if (!state.ru.title) {
        errors.push({
            path: "ru.title",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }

    if (!state.ru.description) {
        errors.push({
            path: "ru.description",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }
    // TODO: Регулярка почта
    if (!state.ru.email) {
        errors.push({
            path: "ru.email",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }

    if (!state.ru.address) {
        errors.push({
            path: "ru.address",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }
    // TODO: Регулярка телефон
    if (!state.ru.phone) {
        errors.push({
            path: "ru.phone",
            message: locale[useSettingsDataStore().locale].error.string,
        });
    }
    return errors;
};
