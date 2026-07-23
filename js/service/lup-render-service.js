'use strict';
angular.module('LUP').
service('RenderSrvc', function(TypeSrvc, SettingsSrvc, CountrySrvc, EnumSrvc) {

    const RenderSrvc = this;

    RenderSrvc.displaySetting = function (key, value) {
        return RenderSrvc.renderClass(SettingsSrvc.setting(key), value);
    };

    RenderSrvc.renderClass = function(type, value) {
        for (let c of TypeSrvc.TYPES[type.type]) {
            console.log(c);
            switch (c) {
                case 'GDO\\Country\\GDT_Country':
                    return "<img src=\""  + CountrySrvc.countryURL(value) + "\" alt='"+value+"' /> ";
                case 'GDO\\Core\\GDT_Array':
                case 'GDO\\Core\\GDT_JSON':
                    return value;
                case 'GDO\\Date\\GDT_Date':
                case 'GDO\\Date\\GDT_Timestamp':
                    return new Date(value).toLocaleDateString();
                case 'GDO\\Core\\GDT_Decimal':
                case 'GDO\\Core\\GDT_Float':
                case 'GDO\\Core\\GDT_ObjectSelect':
                case 'GDO\\Core\\GDT_Int':
                default:
                case 'GDO\\Core\\GDT_String': return value;
                case 'GDO\\Core\\GDT_Enum':
                    if (value == "0") {
                        return type.options.emptyLabel;
                    }
                    return window.t(value);
            }
        }
    };

    return RenderSrvc;
});
