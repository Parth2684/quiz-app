"use client"

import { Button } from "./Button"



export default function PrintButton() {
    return <Button variant="outline" size="sm" onClick={() => window.print()} className="print:hidden" >
          🖨️ Print
        </Button>
} 