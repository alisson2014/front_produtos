import * as F from "./styles";

interface IFieldProps {
    fieldHolder?: string
    fieldLabel: string,
    fieldValue?: string | undefined,
    fieldId: string,
    fieldType?: string
    required?: boolean,
    readonly?: boolean
    minLength?: number | undefined
    maxLength?: number | undefined
    onChange?: (e: any) => void
};

export default function Field({
    fieldHolder,
    fieldLabel,
    fieldValue = "",
    fieldId,
    minLength,
    maxLength,
    fieldType = "text",
    required = false,
    readonly = false,
    onChange
}: IFieldProps) {
    return (
        <F.Container>
            <F.Label htmlFor={fieldId}>{fieldLabel}</F.Label>
            <F.Input
                type={fieldType}
                name={fieldId}
                id={fieldId}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={fieldHolder}
                value={fieldValue}
                readOnly={readonly}
                required={required}
                onChange={onChange}
            />
        </F.Container>
    );
};
