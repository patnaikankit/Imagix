import { useState } from "react";

interface SizeSelectorProps {
    value: string;
    onValueChange: (value: string) => void;
}