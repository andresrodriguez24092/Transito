/*
 * nodeJSSerialPort.c
 *
 * Created: 2019-07-11 10:56:56 a.m.
 * Author : BladimirBaccaCortes
 */ 

#include <avr/io.h>
#define F_CPU	4000000UL
#include <util/delay.h>
#include <stdio.h>

#define MYDELAY 5

int main(void)
{
    /* Replace with your application code */
	unsigned char adcData, adcGarbage, dataTX;
	float tempCh0, tempCh1, tempCh2, tempCh3;
	char txBuffer[50];
	int i;
	
	// IO ports
	DDRA = 0xf0;
	DDRB = 0xff;
	DDRD = 0xff;
	
	// ADC
	/* adc initialization */
	ADCSRA |= (1 << ADPS0);
	ADMUX |= (1 << REFS1) | (1 << REFS0);
	
	// Enables ADC for use
	ADCSRA |= (1 << ADEN);
	
	//RS232
	// Communication Parameters: 8 Data, 1 Stop, No Parity
	// USART Receiver: Off
	// USART Transmitter: On
	// USART Mode: Asynchronous
	// USART Baud Rate: 9600
	UCSRA=0x00;
	UCSRB=0x08;
	UCSRC=0x86;
	UBRRH=0x00;
	UBRRL=0x19;
	
    while (1) 
    {
		// Getting data from ADC
		ADMUX &= ~(1<<MUX2 | 1<<MUX1 | 1<<MUX0);
		ADCSRA |= (1 << ADSC);			// Start ADC
		while (!(ADCSRA & (1<<ADIF)));
		ADCSRA|=(1<<ADIF);				// Clear EOC
		adcData = ADCL>>2;			// Saving ADC
		adcGarbage = ADCH;
		tempCh0 = (float) adcData;
		_delay_ms(MYDELAY);
		
		ADMUX &= ~(1<<MUX2 | 1<<MUX1 | 1<<MUX0);
		ADMUX &= ~(1<<MUX2 | 1<<MUX1);
		ADMUX |= (1<<MUX0);
		ADCSRA |= (1 << ADSC);			// Start ADC
		while (!(ADCSRA & (1<<ADIF)));
		ADCSRA|=(1<<ADIF);				// Clear EOC
		adcData = ADCL>>2;			// Saving ADC
		adcGarbage = ADCH;
		tempCh1 = (float) adcData;
		_delay_ms(MYDELAY);
		
		ADMUX &= ~(1<<MUX2 | 1<<MUX1 | 1<<MUX0);
		ADMUX &= ~(1<<MUX2 | 1<<MUX0);
		ADMUX |= (1<<MUX1);
		ADCSRA |= (1 << ADSC);			// Start ADC
		while (!(ADCSRA & (1<<ADIF)));
		ADCSRA|=(1<<ADIF);				// Clear EOC
		adcData = ADCL>>2;			// Saving ADC
		adcGarbage = ADCH;
		tempCh2 = (float) adcData;
		_delay_ms(MYDELAY);
		
		ADMUX &= ~(1<<MUX2 | 1<<MUX1 | 1<<MUX0);
		ADMUX &= ~(1<<MUX2);
		ADMUX |= (1<<MUX0);
		ADMUX |= (1<<MUX1);
		ADCSRA |= (1 << ADSC);			// Start ADC
		while (!(ADCSRA & (1<<ADIF)));
		ADCSRA|=(1<<ADIF);				// Clear EOC
		adcData = ADCL>>2;			// Saving ADC
		adcGarbage = ADCH;
		tempCh3 = (float) adcData;
		_delay_ms(MYDELAY);
		
		// Arranging string.
		sprintf(txBuffer, "T0=%3.3f::T1=%3.3f::T2=%3.3f::T3=%3.3f ::\r\n", tempCh0, tempCh1, tempCh2, tempCh3);
		PORTB &= ~(1 << 4);
		_delay_ms(MYDELAY);
		
		// TX data.
		dataTX = ' ';
		i = 0;
		while(dataTX != '\n')
		{
			dataTX = txBuffer[i];
			UDR = dataTX;
			while(!(UCSRA & (1 << UDRE)));
			i++;
			_delay_ms(MYDELAY);
		}
    }
}

