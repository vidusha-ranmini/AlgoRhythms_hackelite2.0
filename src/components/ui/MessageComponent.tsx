import React from 'react';

interface FormattedMessageProps {
    content: string;
    sender: 'user' | 'bot';
}

const FormattedMessage: React.FC<FormattedMessageProps> = ({ content, sender }) => {
    const formatBotMessage = (text: string) => {
        // Split by double line breaks first (paragraph separation)
        const paragraphs = text.split(/\n\s*\n/);

        return paragraphs.map((paragraph, pIndex) => {
            // Check if paragraph contains numbered lists (1., 2., 3., etc.)
            const numberedListRegex = /^(\d+\.)\s+(.+)/gm;
            // Check if paragraph contains bullet points (-, •, *, etc.)
            const bulletListRegex = /^([-•*])\s+(.+)/gm;

            let matches;
            let lastIndex = 0;
            const elements = [];

            // Handle numbered lists
            if (numberedListRegex.test(paragraph)) {
                numberedListRegex.lastIndex = 0; // Reset regex

                while ((matches = numberedListRegex.exec(paragraph)) !== null) {
                    // Add text before this match
                    if (matches.index > lastIndex) {
                        const beforeText = paragraph.slice(lastIndex, matches.index).trim();
                        if (beforeText) {
                            elements.push(
                                <p key={`${pIndex}-text-${lastIndex}`} className="mb-2">
                                    {beforeText}
                                </p>
                            );
                        }
                    }

                    // Add the numbered item
                    elements.push(
                        <div key={`${pIndex}-num-${matches.index}`} className="flex gap-2 mb-2">
                            <span className="font-semibold text-indigo-600 min-w-[1.5rem]">
                                {matches[1]}
                            </span>
                            <span className="flex-1">{matches[2]}</span>
                        </div>
                    );

                    lastIndex = matches.index + matches[0].length;
                }

                // Add remaining text
                if (lastIndex < paragraph.length) {
                    const remainingText = paragraph.slice(lastIndex).trim();
                    if (remainingText) {
                        elements.push(
                            <p key={`${pIndex}-remaining`} className="mb-2">
                                {remainingText}
                            </p>
                        );
                    }
                }

                return (
                    <div key={`paragraph-${pIndex}`} className="mb-4">
                        {elements}
                    </div>
                );
            }

            // Handle bullet lists
            else if (bulletListRegex.test(paragraph)) {
                bulletListRegex.lastIndex = 0; // Reset regex
                lastIndex = 0;
                const bulletElements = [];

                while ((matches = bulletListRegex.exec(paragraph)) !== null) {
                    // Add text before this match
                    if (matches.index > lastIndex) {
                        const beforeText = paragraph.slice(lastIndex, matches.index).trim();
                        if (beforeText) {
                            bulletElements.push(
                                <p key={`${pIndex}-text-${lastIndex}`} className="mb-2">
                                    {beforeText}
                                </p>
                            );
                        }
                    }

                    // Add the bullet item
                    bulletElements.push(
                        <div key={`${pIndex}-bullet-${matches.index}`} className="flex gap-2 mb-2">
                            <span className="text-indigo-600 min-w-[1rem]">•</span>
                            <span className="flex-1">{matches[2]}</span>
                        </div>
                    );

                    lastIndex = matches.index + matches[0].length;
                }

                // Add remaining text
                if (lastIndex < paragraph.length) {
                    const remainingText = paragraph.slice(lastIndex).trim();
                    if (remainingText) {
                        bulletElements.push(
                            <p key={`${pIndex}-remaining`} className="mb-2">
                                {remainingText}
                            </p>
                        );
                    }
                }

                return (
                    <div key={`paragraph-${pIndex}`} className="mb-4">
                        {bulletElements}
                    </div>
                );
            }

            // Regular paragraph - check for inline lists
            else {
                // Look for sentences that might be list items even without proper formatting
                const sentences = paragraph.split(/(?<=[.!?])\s+/);
                const hasListPattern = sentences.some(sentence =>
                    /^(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Next|Also|Additionally|Furthermore|Moreover)/i.test(sentence.trim()) ||
                    /^(Step \d+|Point \d+|Tip \d+)/i.test(sentence.trim())
                );

                if (hasListPattern && sentences.length > 1) {
                    return (
                        <div key={`paragraph-${pIndex}`} className="mb-4">
                            {sentences.map((sentence, sIndex) => (
                                sentence.trim() && (
                                    <div key={`${pIndex}-sentence-${sIndex}`} className="mb-2">
                                        {sentence.trim()}
                                    </div>
                                )
                            ))}
                        </div>
                    );
                }

                // Regular paragraph
                return (
                    <p key={`paragraph-${pIndex}`} className="mb-4 last:mb-0">
                        {paragraph}
                    </p>
                );
            }
        });
    };

    if (sender === 'bot') {
        return <div className="text-sm leading-relaxed">{formatBotMessage(content)}</div>;
    }

    // User messages remain as simple text
    return <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>;
};

export default FormattedMessage;