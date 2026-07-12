"use client";

import { useState, useEffect, useRef } from 'react';
import { BankAccount } from './types';
import styles from './Gift.module.css';
import { Card, Button } from '../ui';

export default function BankCard({ name, account, recipient }: BankAccount) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(account);
        setIsCopied(true);
        
        // Zero memory leak strategy: Clear previous timeout if user spams the button
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    } catch (err) {
      // Graceful degradation if clipboard fails (e.g. non-HTTPS env without permission)
      console.warn("Failed to copy text silently.");
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Card>
      <div className={styles.bankCardContent}>
        <h3 className={styles.bankName}>{name}</h3>
        <p className={styles.accountNumber}>{account}</p>
        <p className={styles.recipient}>a.n {recipient}</p>
        
        <Button 
          variant={isCopied ? "primary" : "secondary"}
          onClick={handleCopy}
          aria-label={isCopied ? "Copied to clipboard" : `Copy account number for ${name}`}
        >
          {isCopied ? "Copied!" : "Copy Account"}
        </Button>
      </div>
    </Card>
  );
}
