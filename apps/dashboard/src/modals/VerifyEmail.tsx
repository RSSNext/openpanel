'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { getClerkError } from '@/utils/clerk-error';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { popModal } from '.';
import { ModalContent, ModalHeader } from './Modal/Container';

type Props = {
  email: string;
};

export default function VerifyEmail({ email }: Props) {
  return null
}
