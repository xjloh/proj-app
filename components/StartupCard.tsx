'use client';

import { cn, formatDate } from '@/lib/utils'
import { EyeIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from './ui/skeleton'
import { usePathname } from 'next/navigation';
import { deletePitch } from '@/lib/actions';
import { toast } from '@/hooks/use-toast';
import { Spinner } from './ui/spinner';

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const {
        _createdAt,
        views,
        author,
        title,
        category,
        _id,
        image,
        description,
    } = post;

    const [deleting, setDeleting] = useState(false);

    const path = usePathname();

    const handleDelete = async (id: string) => {
        setDeleting(true);
        try {
            const result = await deletePitch(id);

            if (result.status == "SUCCESS") {
                toast({
                title: "Success",
                description: "Startup card deleted successfully",
                });
            }

        } catch (error) {
            console.log(error);

            toast({
                title: "Error",
                description: "Cannot delete startup card, please try again",
                variant: "destructive",
            });
        } finally {
            setDeleting(false);
        }
    }

    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                <p className='startup_card_date'>
                    {formatDate(_createdAt)}
                </p>
                <div className='flex gap-5'>
                    <div className='flex gap-1.5'>
                        <EyeIcon className='size-6 text-primary' />
                        <span className='text-16-medium'>{views}</span>
                    </div>
                    {path.toString().match('user') ?
                        (
                            <button className='ghost' disabled={deleting} onClick={() => {handleDelete(_id)}}>
                                {
                                    deleting ? (<Spinner></Spinner>) : (<Trash></Trash>)
                                }
                            </button>
                        )
                        : ''
                    }
                </div>
            </div>

            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1'>
                    <Link href={`/user/${author?._id}`}>
                        <p className='text-16-medium line-clamp-1'>
                            {author?.name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    {/* TODO: this needs to be modified */}
                    <Image src={author?.image || ''} alt={author?.name || ''} width={48} height={48} className='rounded-full'></Image>
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>{description}</p>
                <img src={image} alt='placeholder' className='startup-card_img'></img>
            </Link>
            <div className='flex-between gap-3 mt-5'>
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='text-16-medium'>{category}</p>
                </Link>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
  )
}

export const StartupCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
            <Skeleton className="startup-card_skeleton" />
        </li>
        ))}
    </>
);

export default StartupCard