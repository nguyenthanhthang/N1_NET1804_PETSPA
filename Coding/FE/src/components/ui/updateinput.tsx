import React from "react";
import { ErrorMessage } from "formik";
import { Input } from "@nextui-org/react";

export interface MyInputProps {
    field: {
        name: string;
        value: string; // Ensure value is always a string
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    placeholder: string;
}

export const MyInputFirstName = ({ field, placeholder }: MyInputProps) => (
    <div className="relative">
        <Input
            {...field}
            id={field.name}
            value={field.value} // Ensure value is always a string
            onChange={field.onChange}
            autoComplete="off"
            placeholder={placeholder}
            required
        />
        <ErrorMessage
            name={field.name}
            component="p"
            className="pt-2 text-sm text-red-500"
        />
    </div>
);

export const MyInputLastName = ({ field, placeholder }: MyInputProps) => (
    <div className="relative">
        <Input
            {...field}
            id={field.name}
            value={field.value} // Ensure value is always a string
            onChange={field.onChange}
            autoComplete="off"
            placeholder={placeholder}
            required
        />
        <ErrorMessage
            name={field.name}
            component="p"
            className="pt-2 text-sm text-red-500"
        />
    </div>
);

export const MyInputEmail = ({ field, placeholder }: MyInputProps) => (
    <div className="relative">
        <Input
            {...field}
            id={field.name}
            value={field.value} // Ensure value is always a string
            onChange={field.onChange}
            autoComplete="off"
            placeholder={placeholder}
            required
        />
        <ErrorMessage
            name={field.name}
            component="p"
            className="pt-2 text-sm text-red-500"
        />
    </div>
);

export const MyInputPhoneNumber = ({ field, placeholder }: MyInputProps) => (
    <div className="relative">
        <Input
            {...field}
            id={field.name}
            value={field.value} // Ensure value is always a string
            onChange={field.onChange}
            autoComplete="off"
            placeholder={placeholder}
            required
        />
        <ErrorMessage
            name={field.name}
            component="p"
            className="pt-2 text-sm text-red-500"
        />
    </div>
);
