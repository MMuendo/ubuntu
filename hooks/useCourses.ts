/**
 * useCourses Hook - Fetches courses from Supabase with fallback to constants
 */

import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { COURSES as FALLBACK_COURSES } from '../constants';

export interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    level: string;
    tags: string[];
    duration?: string;
    is_active: boolean;
}

export function useCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error: dbError } = await supabase
                .from('courses')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: true });

            if (dbError) {
                console.warn('Failed to fetch courses from DB, using fallback:', dbError);
                // Use fallback constants
                setCourses(FALLBACK_COURSES.map(c => ({
                    id: c.id,
                    title: c.title,
                    description: c.description,
                    price: c.price,
                    currency: 'KES',
                    level: c.level,
                    tags: c.tags,
                    is_active: true,
                })));
            } else if (data && data.length > 0) {
                setCourses(data);
            } else {
                // No data in DB, use fallback
                setCourses(FALLBACK_COURSES.map(c => ({
                    id: c.id,
                    title: c.title,
                    description: c.description,
                    price: c.price,
                    currency: 'KES',
                    level: c.level,
                    tags: c.tags,
                    is_active: true,
                })));
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Failed to load courses');
            // Use fallback
            setCourses(FALLBACK_COURSES.map(c => ({
                id: c.id,
                title: c.title,
                description: c.description,
                price: c.price,
                currency: 'KES',
                level: c.level,
                tags: c.tags,
                is_active: true,
            })));
        }

        setLoading(false);
    };

    return { courses, loading, error, refetch: fetchCourses };
}

export default useCourses;
